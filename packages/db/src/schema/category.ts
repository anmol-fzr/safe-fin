import { relations } from "drizzle-orm";
import {
	type AnySQLiteColumn,
	integer,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

const category = sqliteTable("category", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	title: text("title", { length: 256 }).notNull(),
	desc: text("description").notNull(),
	parentCategoryId: integer("parent_category_id").references(
		(): AnySQLiteColumn => category.id,
	),
});

export const categoryscamRelations = relations(category, ({ one }) => ({
	categories: one(category),
}));

export { category };
