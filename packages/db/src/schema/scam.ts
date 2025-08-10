import { relations, sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { tag } from "./tag";
import { category } from "./category";

export const scam = sqliteTable("scam", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }).notNull(),
  title: text("title", { length: 256 }).notNull(),
  desc: text("description").notNull(),

  categoryId: integer("category_id", { mode: "number" }).references(() => category.id).notNull(),
  reportedAt: text("reported_at").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  reportedBy: text("reported_by", { length: 256 }).references(() => user.id), // email or user ID
  sourceUrl: text("source_url", { length: 512 }),
  region: text("region", { length: 100 }),

  // Moderation fields
  isVerified: integer("is_verified", { mode: "boolean" }).default(false),
  reviewedBy: text("reviewed_by", { length: 256 }),
  reviewedAt: text("reported_at"),
  notes: text("notes") // For admin remarks
});


export const scamTags = sqliteTable("scam_tags", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }).notNull(),
  scamId: integer("scam_id").references(() => scam.id).notNull(),
  tagId: integer("tag_id").references(() => tag.id).notNull(),
});

export const scamRelations = relations(scam, ({ many }) => ({
  tags: many(scamTags),
}));

export const tagRelations = relations(tag, ({ many }) => ({
  scams: many(scamTags),
}));

export const scamTagRelations = relations(scamTags, ({ one }) => ({
  scam: one(scam, { fields: [scamTags.scamId], references: [scam.id] }),
  tag: one(tag, { fields: [scamTags.tagId], references: [tag.id] }),
}));

export const categoryScamRelations = relations(category, ({ many }) => ({
  scams: many(scam),
}));
