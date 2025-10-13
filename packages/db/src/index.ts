import { createClient } from "@libsql/client";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export interface GetDbOpts {
	TURSO_DB_URL: string;
	TURSO_DB_TOKEN: string;
}

function getDb(envs: GetDbOpts): ReturnType<typeof drizzle> {
	const turso = createClient({
		//url: "http://127.0.0.1:8080",
		url: envs.TURSO_DB_URL,
		authToken: envs.TURSO_DB_TOKEN,
	});

	return drizzle(turso, { schema });
}

const getAuthDrizzleAdapter = (creds: GetDbOpts) => {
	const db = getDb(creds);

	return drizzleAdapter(db, { provider: "sqlite" });
};

export * from "./schema";
export { getAuthDrizzleAdapter, getDb };
