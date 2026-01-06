import { getDb } from "@safe-fin/db";

type DB = ReturnType<typeof getDb>;

export type { DB };
export * from "@safe-fin/db";
export * from "@safe-fin/db/schema";
