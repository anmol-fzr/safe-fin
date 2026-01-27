import type { DB as DB_DEV } from "@safe-fin/db/db.dev";
import type { DB as DB_PROD } from "@safe-fin/db/db.prod";

export * from "@safe-fin/db";
export * from "@safe-fin/db/schema";

export type DB = DB_DEV | DB_PROD;
