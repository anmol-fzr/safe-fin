import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";
import type { D1Database } from "@cloudflare/workers-types";

export interface GetDbOpts {
	DB_URL: string;
	DB_TOKEN: string;
}

let dbInst: ReturnType<typeof drizzle<typeof schema, D1Database>> | null = null;

function getDb(d1: D1Database) {
	if (dbInst !== null) {
		return dbInst;
	}

	dbInst = drizzle(d1, { schema, logger: true });
	return dbInst;
}

const getAuthDrizzleAdapter = (
	d1: D1Database,
): ReturnType<typeof drizzleAdapter> => {
	const db = getDb(d1);

	return drizzleAdapter(db, { provider: "sqlite", debugLogs: false });
};

export { getAuthDrizzleAdapter, getDb };
export type DB = ReturnType<typeof getDb>;
