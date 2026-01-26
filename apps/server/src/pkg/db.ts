import type { DevDB, ProdDB } from "@safe-fin/db";

type DB = DevDB | ProdDB;

export type { DB };
export * from "@safe-fin/db";
export * from "@safe-fin/db/schema";
