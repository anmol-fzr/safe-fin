import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const calculator = sqliteTable("table", {
	id: text("id").primaryKey(),
	text: text({ mode: "json" }),
});

export { calculator };
