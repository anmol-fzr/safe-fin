/**
 * Better Auth CLI configuration file
 *
 * Docs: https://www.better-auth.com/docs/concepts/cli
 */

import { getAuthDrizzleAdapter } from "@safe-fin/db";
import { betterAuth } from "better-auth";
import { envs } from "./envs";
import { betterAuthOptions } from "./options";

const { BETTER_AUTH, DB, CORS_URL } = envs;

const database = getAuthDrizzleAdapter({
	TURSO_DB_URL: DB.URL,
	TURSO_DB_TOKEN: DB.TOKEN,
});

export const auth: ReturnType<typeof betterAuth> = betterAuth({
	...betterAuthOptions,
	database,
	baseURL: BETTER_AUTH.URL,
	secret: BETTER_AUTH.SECRET,
	trustedOrigins: [CORS_URL],
});
