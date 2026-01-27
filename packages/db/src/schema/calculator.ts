import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id } from "./__utils";

const calculator = sqliteTable("calculator", {
	id,
	calculator: text({ mode: "json" }),
});

export { calculator };
