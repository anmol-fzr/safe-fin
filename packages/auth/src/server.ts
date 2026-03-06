import type { D1Database } from "@cloudflare/workers-types";
import { betterAuth } from "better-auth/minimal";
import { getAuthDrizzleAdapter, getDb } from "@/pkg/db";
import { getBetterAuthOptions } from "./options";

export interface EmailOtps {
	CLIENT_ID: string;
	CLIENT_SECRET: string;
	REFRESH_TOKEN: string;
}

interface AuthOpts {
	isDev: boolean;
	DB: D1Database;

	BETTER_AUTH: {
		URL: string;
		SECRET: string;
	};

	CORS_ORIGIN_URL: string;

	EMAIL: EmailOtps;

	TEST_CREDS: {
		EMAIL: string;
		OTP: string;
	};
}

/**
 * Better Auth Instance
 */
export const auth = (opts: AuthOpts) => {
	const { DB, BETTER_AUTH, CORS_ORIGIN_URL, ...rest } = opts;

	const db = getDb(DB);
	const database = getAuthDrizzleAdapter(DB);

	const betterAuthOptions = getBetterAuthOptions({
		db,
		...rest,
	});

	return betterAuth({
		...betterAuthOptions,
		database,
		baseURL: BETTER_AUTH.URL,
		basePath: "/api/v1/auth",
		secret: BETTER_AUTH.SECRET,
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
