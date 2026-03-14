import { envs } from "@/utils/envs";
import { getDb as getDbBase } from "@safe-fin/db";

export function getDb() {
	return getDbBase(envs.DB);
}

export * from "@safe-fin/db";
export * from "@safe-fin/db/schema";
