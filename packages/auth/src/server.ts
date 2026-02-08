import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth/minimal";
import { getAuthDrizzleAdapter } from "@/pkg/db";
import { getBetterAuthOptions } from "./options";
//import studioConfig from "./studio.config";
import type { D1Database } from "@cloudflare/workers-types";

export interface EmailOtps {
	CLIENT_ID: string;
	CLIENT_SECRET: string;
	REFRESH_TOKEN: string;
}

interface AuthOpts {
	isDev: boolean;
	DB: D1Database;
	//KV: KVNamespace<string>;
	BETTER_AUTH_URL: string;
	BETTER_AUTH_SECRET: string;
	CORS_ORIGIN_URL: string;

	EMAIL: EmailOtps;
	//ctx?: ExecutionContext;
}

/**
 * Better Auth Instance
 */
export const auth = (opts: AuthOpts) => {
	const {
		isDev,
		DB,
		EMAIL,
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
	} = opts;

	const database = getAuthDrizzleAdapter(DB);

	const betterAuthOptions = getBetterAuthOptions({ isDev, EMAIL });

	return betterAuth({
		...betterAuthOptions,
		database,
		baseURL: BETTER_AUTH_URL,
		basePath: "/api/v1/auth",
		secret: BETTER_AUTH_SECRET,
		trustedOrigins: [CORS_ORIGIN_URL],
	});
};

type ServerAuth = typeof auth;
type BaTypes = ReturnType<ServerAuth>["$Infer"]["Session"];

type Session = BaTypes["session"];
type User = BaTypes["user"] & {
	role: "admin" | "user";
};

export type { Session, User, ServerAuth };
