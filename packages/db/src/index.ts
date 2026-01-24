import { createClient } from "@libsql/client";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
//import * as relations from "./schema/relations";

export interface GetDbOpts {
	DB_URL: string;
	DB_TOKEN: string;
}

let dbInst: ReturnType<
	typeof drizzle<typeof schema, ReturnType<typeof createClient>>
> | null = null;

function getDb(opts: GetDbOpts) {
	if (dbInst !== null) {
		return dbInst;
	}

	const { DB_URL, DB_TOKEN } = opts;

	const turso = createClient({
		url: DB_URL,
		authToken: DB_TOKEN,
	});

	dbInst = drizzle(turso, { schema, logger: true });
	return dbInst;
}

const getAuthDrizzleAdapter = (
	creds: GetDbOpts,
): ReturnType<typeof drizzleAdapter> => {
	const db = getDb(creds);

	return drizzleAdapter(db, { provider: "sqlite", debugLogs: false });
};

export * from "drizzle-orm";
export { getAuthDrizzleAdapter, getDb };
export type DB = ReturnType<typeof getDb>;
