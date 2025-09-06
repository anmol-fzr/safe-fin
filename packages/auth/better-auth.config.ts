/**
 * Better Auth CLI configuration file
 *
 * Docs: https://www.better-auth.com/docs/concepts/cli
 */
import { betterAuth } from "better-auth";
import { betterAuthOptions } from "./src/better-auth/options";
import { envs } from "./src/envs";
import { createClient } from "@libsql/client";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/libsql";

const { BETTER_AUTH, DB, CORS_URL } = envs;

type GetDbParams = {
	TURSO_DB_URL: string;
	TURSO_DB_TOKEN: string;
};

function getDb(envs: GetDbParams): ReturnType<typeof drizzle> {
	console.log("getDB", envs);

	const turso = createClient({
		url: envs.TURSO_DB_URL,
		authToken: envs.TURSO_DB_TOKEN,
	});

	return drizzle(turso);
}

const getAuthDrizzleAdapter = (env: Parameters<typeof getDb>[0]) => {
	const db = getDb(env);
	return drizzleAdapter(db, { provider: "sqlite" });
};

const database = getAuthDrizzleAdapter({
	TURSO_DB_URL: DB.URL,
	TURSO_DB_TOKEN: DB.TOKEN,
});

export const auth: ReturnType<typeof betterAuth> = betterAuth({
	...betterAuthOptions,
	database,
	baseURL: BETTER_AUTH.URL,
	secret: BETTER_AUTH.SECRET,
	trustedOrigins: [CORS_URL, "http://192.168.29.57:5173"],
});
