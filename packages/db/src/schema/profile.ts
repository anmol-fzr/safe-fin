import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

export const profile = sqliteTable("profile", {
	id: text("id").primaryKey(),
	userId: text("id").unique().notNull(),

	dob: integer("dob", { mode: "timestamp_ms" }).default(new Date(2000, 0, 1)),
	gender: text("gender").default("male"),
});

export const userProfileRelations = relations(profile, ({ one }) => ({
	lesson: one(user, {
		fields: [profile.id],
		references: [user.id],
	}),
}));
