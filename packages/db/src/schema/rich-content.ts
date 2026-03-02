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

export type InsertRichContent = Omit<
	typeof richContent.$inferInsert,
	"id" | "createdAt" | "updatedAt"
>;

export const richContentItem = sqliteTable("rich_content_item", {
	id,
	content: text().notNull(),
	contentJson: text({ mode: "json" }).notNull().$type<{
		type: string;
		content: Array<{
			type: string;
			attrs: {
				textAlign?: string | null;
				language?: string | null;
				level?: number;
			};
			content?: Array<{
				type: string;
				text: string;
				marks?: Array<{
					type: string;
				}>;
			}>;
		}>;
	}>(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export type InsertRichContentItem = Omit<
	typeof richContentItem.$inferInsert,
	"id" | "createdAt" | "updatedAt"
>;
