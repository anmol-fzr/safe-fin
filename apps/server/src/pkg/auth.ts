import { auth as authOrg } from "@safe-fin/auth/server";

export function auth(envs: CloudflareBindings) {
	const {
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
		DB_URL,
		DB_TOKEN,
		KV,
	} = envs;

	return authOrg({
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
		DB_URL,
		DB_TOKEN,
		KV,
	});
}

export type { Session, User } from "@safe-fin/auth/server";
