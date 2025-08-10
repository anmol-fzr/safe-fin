import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

const tag = sqliteTable("tag", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name", { length: 50 }).notNull().unique(),
});

export { tag }
