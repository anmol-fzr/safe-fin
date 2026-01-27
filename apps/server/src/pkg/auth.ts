import { auth as authOrg } from "@safe-fin/auth/server";

import type { ExecutionContext } from "@cloudflare/workers-types";

export function auth(envs: CloudflareBindings, ctx?: ExecutionContext) {
	const {
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
		DB_URL,
		DB_TOKEN,
		DB,
		KV,
	} = envs;

	return authOrg({
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
		DB_URL,
		DB_TOKEN,
		DB,
		KV,
		ctx,
	});
}

export type { Session, User } from "@safe-fin/auth/server";
