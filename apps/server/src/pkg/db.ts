import type { DevDB, ProdDB } from "@safe-fin/db";
import { getDevDb, getProdDb } from "@safe-fin/db";
import { env } from "cloudflare:workers";

type DB = DevDB | ProdDB;

const getDb = () => {
	const { DB, DB_URL, DB_TOKEN } = env;

	if (DB_URL && DB_TOKEN) {
		return getDevDb({ DB_URL, DB_TOKEN });
	}

	return getProdDb(DB);
};

export type { DB };
export { getDb };
export * from "@safe-fin/db";
export * from "@safe-fin/db/schema";
