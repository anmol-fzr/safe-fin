import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const calculator = sqliteTable("table", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	text: text({ mode: "json" }),
});

export { calculator };
