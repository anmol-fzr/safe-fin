import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";
import type { GetDbOpts } from "@/pkg/db";
import { getAuthDrizzleAdapter, getDb } from "@/pkg/db";
import { getBetterAuthOptions } from "./options";
//import studioConfig from "./studio.config";

interface AuthOpts extends GetDbOpts {
	BETTER_AUTH_URL: string;
	BETTER_AUTH_SECRET: string;
	CORS_ORIGIN_URL: string;
}

/**
 * Better Auth Instance
 */
export const auth = (opts: AuthOpts, baOpts?: BetterAuthOptions) => {
	const { DB_URL, DB_TOKEN } = opts;

	const database = getAuthDrizzleAdapter({
		DB_URL,
		DB_TOKEN,
	});

	const db = getDb({
		DB_URL,
		DB_TOKEN,
	});

	const betterAuthOptions = getBetterAuthOptions({ db });

	return betterAuth({
		...betterAuthOptions,
		...baOpts,

		database,
		baseURL: opts.BETTER_AUTH_URL,
		basePath: "/api/v1/auth",
		secret: opts.BETTER_AUTH_SECRET,
		trustedOrigins: [opts.CORS_ORIGIN_URL],
	});
};

type BaTypes = ReturnType<typeof auth>["$Infer"]["Session"];

type Session = BaTypes["session"];
type User = BaTypes["user"] & {
	role: "admin" | "user";
};

export type { Session, User };
