import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "./__utils";

const calculator = sqliteTable("calculator", {
	id,
	title: text().notNull(),
	desc: text().notNull(),
	calculator: text({ mode: "json" }),
});

export { calculator };
