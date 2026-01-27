import { auth as authOrg } from "@safe-fin/auth/server";
//import { env } from "cloudflare:workers";

export function auth(env: CloudflareBindings) {
	const {
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
		DB_URL,
		DB_TOKEN,
		DB,
		//KV,
		EMAIL_CLIENT_ID,
		EMAIL_CLIENT_SECRET,
		EMAIL_REFRESH_TOKEN,
		MODE,
	} = env;

	return authOrg({
		isDev: MODE === "DEV",
		BETTER_AUTH_URL,
		BETTER_AUTH_SECRET,
		CORS_ORIGIN_URL,
		DB_URL,
		DB_TOKEN,
		DB,
		EMAIL: {
			CLIENT_ID: EMAIL_CLIENT_ID,
			CLIENT_SECRET: EMAIL_CLIENT_SECRET,
			REFRESH_TOKEN: EMAIL_REFRESH_TOKEN,
		},
		//KV,
	});
}

export type { Session, User } from "@safe-fin/auth/server";
