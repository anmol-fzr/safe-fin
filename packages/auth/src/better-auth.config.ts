/**
 * Better Auth CLI configuration file
 *
 * Docs: https://www.better-auth.com/docs/concepts/cli
 */

import { betterAuth } from "better-auth";
import { getAuthDrizzleAdapter, getDb } from "@/pkg/db";
import { envs } from "./envs";
import { getBetterAuthOptions } from "./options";

const { isDev, BETTER_AUTH, DB, CORS_URL, EMAIL } = envs;

const database = getAuthDrizzleAdapter({
	DB_URL: DB.URL,
});
//
// const db = getDb({
// 	DB_URL: DB.URL,
// });

const betterAuthOptions = getBetterAuthOptions({ db: DB, EMAIL, isDev });

export const auth: ReturnType<typeof betterAuth> = betterAuth({
	...betterAuthOptions,
	database,
	baseURL: BETTER_AUTH.URL,
	secret: BETTER_AUTH.SECRET,
	trustedOrigins: [CORS_URL],
});

export { database };
