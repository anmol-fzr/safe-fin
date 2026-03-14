import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profile = sqliteTable("profile", {
	id: text("id").primaryKey(),
	userId: text("id").unique().notNull(),

	dob: integer("dob", { mode: "timestamp_ms" }).default(new Date(2000, 0, 1)),
	gender: text("gender").default("male"),
});
