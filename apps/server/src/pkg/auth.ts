import { auth as authOrg } from "@safe-fin/auth/server";
import { envs } from "@/utils/envs";

export function auth() {
	const { BETTER_AUTH, CORS_ORIGIN_URL, DB, EMAIL, isDev } = envs;

	return authOrg({
		isDev,
		BETTER_AUTH_URL: BETTER_AUTH.URL,
		BETTER_AUTH_SECRET: BETTER_AUTH.SECRET,
		CORS_ORIGIN_URL,
		DB,
		EMAIL,
	});
}

export type { Session, User } from "@safe-fin/auth/server";
