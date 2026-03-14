import { auth as authOrg } from "@safe-fin/auth/server";
import { envs } from "@/utils/envs";

export function auth() {
	const { BETTER_AUTH, CORS_ORIGIN_URL, DB, EMAIL, isDev, TEST_CREDS } = envs;

	return authOrg({
		isDev,
		BETTER_AUTH,
		CORS_ORIGIN_URL,
		DB,
		EMAIL,
		TEST_CREDS,
	});
}

export type { Session, User } from "@safe-fin/auth/server";
