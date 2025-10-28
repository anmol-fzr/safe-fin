import { auth as authOrg } from "@safe-fin/auth/server";

export function auth(envs: CloudflareBindings) {
	const {
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
		TURSO_DB_URL,
		TURSO_DB_TOKEN,
	} = envs;

	return authOrg({
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
		TURSO_DB_URL,
		TURSO_DB_TOKEN,
	});
}

export type { Session, User } from "@safe-fin/auth/server";
