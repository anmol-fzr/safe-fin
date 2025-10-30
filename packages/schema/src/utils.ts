import type { Table } from "@safe-fin/db";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";

export function createSchemas<TTable extends Table>(table: TTable) {
	return [
		createSelectSchema(table),
		createInsertSchema(table),
		createUpdateSchema(table),
	] as const;
}
