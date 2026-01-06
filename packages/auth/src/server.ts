import type { GetDbOpts } from "@safe-fin/db";
import { getAuthDrizzleAdapter } from "@safe-fin/db";
import type { BetterAuthOptions } from "better-auth";
//import type { SecondaryStorage } from "better-auth";
import { betterAuth } from "better-auth";
//import { betterAuthStudio } from "better-auth-studio/hono";
import { betterAuthOptions } from "./options";

//import studioConfig from "./studio.config";

interface AuthOpts extends GetDbOpts {
	BETTER_AUTH_URL: string;
	BETTER_AUTH_SECRET: string;
	CORS_ORIGIN_URL: string;
}

/**
 * Creates secondary storage using Cloudflare KV
 *
 * @param kv - Cloudflare KV namespace
 * @returns SecondaryStorage implementation
 */
// const createKVStorage = (kv: KVNamespace<string>): SecondaryStorage => {
// 	return {
// 		get: async (key: string) => {
// 			return kv.get(key);
// 		},
// 		set: async (key: string, value: string, ttl?: number) => {
// 			return kv.put(key, value, ttl ? { expirationTtl: ttl } : undefined);
// 		},
// 		delete: async (key: string) => {
// 			return kv.delete(key);
// 		},
// 	};
// };

//app.on(['POST', 'GET', 'PUT', 'DELETE'], '/api/studio/*',
//export const betterAuthStudioHandler = betterAuthStudio(studioConfig);

/**
 * Better Auth Instance
 */
export const auth = (opts: AuthOpts, baOpts?: BetterAuthOptions) => {
	//const kv = env.SAFE_FIN_KV;

	const database = getAuthDrizzleAdapter({
		TURSO_DB_URL: opts.TURSO_DB_URL,
		TURSO_DB_TOKEN: opts.TURSO_DB_TOKEN,
	});

	return betterAuth({
		...betterAuthOptions,
		...baOpts,
		database,
		baseURL: opts.BETTER_AUTH_URL,
		secret: opts.BETTER_AUTH_SECRET,
		trustedOrigins: [opts.CORS_ORIGIN_URL],
		//secondaryStorage: createKVStorage(kv),
	});
};

type BaTypes = ReturnType<typeof auth>["$Infer"]["Session"];

type Session = BaTypes["session"];
type User = BaTypes["user"] & {
	role: "admin" | "user";
};

export type { Session, User };
