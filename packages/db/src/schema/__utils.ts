import { integer } from "drizzle-orm/sqlite-core";

export const timestamp = (colName: string) =>
	integer(colName, { mode: "timestamp" });

timestamp.createdAt = timestamp("created_at")
	.$defaultFn(() => new Date())
	.notNull();

timestamp.updatedAt = timestamp("updated_at")
	.$defaultFn(() => new Date())
	.$onUpdateFn(() => new Date())
	.notNull();
