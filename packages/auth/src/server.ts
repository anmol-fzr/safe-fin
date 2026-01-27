import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth/minimal";
import {
	getDevAuthDrizzleAdapter,
	getDevDb,
	getProdAuthDrizzleAdapter,
	getProdDb,
} from "@/pkg/db";
import { getBetterAuthOptions } from "./options";
//import studioConfig from "./studio.config";
import type {
	D1Database,
	ExecutionContext,
	KVNamespace,
} from "@cloudflare/workers-types";

interface AuthOpts {
	DB?: D1Database;
	KV: KVNamespace<string>;
	DB_URL?: string;
	DB_TOKEN?: string;
	BETTER_AUTH_URL: string;
	BETTER_AUTH_SECRET: string;
	CORS_ORIGIN_URL: string;
	ctx?: ExecutionContext;
}

/**
 * Better Auth Instance
 */
export const auth = (opts: AuthOpts, baOpts?: BetterAuthOptions) => {
	const { DB_URL, DB_TOKEN, DB, KV, ctx } = opts;

	let database;
	let db;

	if (DB_URL && DB_TOKEN) {
		database = getDevAuthDrizzleAdapter({
			DB_URL,
			DB_TOKEN,
		});
		db = getDevDb({
			DB_URL,
			DB_TOKEN,
		});
	} else if (DB) {
		database = getProdAuthDrizzleAdapter(DB);
		db = getProdDb(DB);
	} else {
		throw new Error("No database configuration found");
	}

	const betterAuthOptions = getBetterAuthOptions({
		DB: db,
		KV,
		waitUntil: ctx?.waitUntil.bind(ctx),
	});

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
