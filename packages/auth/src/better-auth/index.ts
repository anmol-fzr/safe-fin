import { betterAuth } from "better-auth";
import { betterAuthOptions } from "./options";
import { getAuthDrizzleAdapter } from "@safe-fin/db";
import type { SecondaryStorage } from "better-auth";

/**
 * Creates secondary storage using Cloudflare KV
 *
 * @param kv - Cloudflare KV namespace
 * @returns SecondaryStorage implementation
 */
const createKVStorage = (kv: KVNamespace<string>): SecondaryStorage => {
	return {
		get: async (key: string) => {
			return kv.get(key);
		},
		set: async (key: string, value: string, ttl?: number) => {
			return kv.put(key, value, ttl ? { expirationTtl: ttl } : undefined);
		},
		delete: async (key: string) => {
			return kv.delete(key);
		},
	};
};

/**
 * Better Auth Instance
 */
export const auth = (
	env: CloudflareBindings,
): ReturnType<typeof betterAuth> => {
	const kv = env.SAFE_FIN_KV;

	const database = getAuthDrizzleAdapter(env);

	return betterAuth({
		...betterAuthOptions,
		database,
		baseURL: env.BETTER_AUTH_URL,
		secret: env.BETTER_AUTH_SECRET,
		trustedOrigins: [env.CORS_ORIGIN_URL],
		//secondaryStorage: createKVStorage(kv),
	});
};
