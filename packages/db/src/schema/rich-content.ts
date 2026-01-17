import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";

export const richContent = sqliteTable("rich_content", {
	id,
	title: text().notNull(),
	shortDesc: text("short_desc").notNull(),
	longDescRichId: integer("long_desc_rich_id")
		.references(() => richContentItem.id)
		.notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const richContentItem = sqliteTable("rich_content_item", {
	id,
	content: text().notNull(),
	contentJson: text({ mode: "json" }).notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});
