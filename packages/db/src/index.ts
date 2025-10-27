import { type Client, createClient } from "@libsql/client";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export interface GetDbOpts {
	TURSO_DB_URL: string;
	TURSO_DB_TOKEN: string;
}

let dbInst: ReturnType<typeof drizzle<typeof schema, Client>> | null = null;

function getDb(opts: GetDbOpts) {
	if (dbInst !== null) {
		return dbInst;
	}

	const { TURSO_DB_URL, TURSO_DB_TOKEN } = opts;

	const turso = createClient({
		url: TURSO_DB_URL,
		authToken: TURSO_DB_TOKEN,
	});

	dbInst = drizzle(turso, { schema });
	return dbInst;
}

const getAuthDrizzleAdapter = (creds: GetDbOpts) => {
	const db = getDb(creds);

	return drizzleAdapter(db, { provider: "sqlite" });
};

export * from "./schema";
export { getAuthDrizzleAdapter, getDb };
