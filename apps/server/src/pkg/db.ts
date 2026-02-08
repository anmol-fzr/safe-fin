import { getDb as getDbBase } from "@safe-fin/db";
import { env } from "cloudflare:workers";

export function getDb() {
	return getDbBase(env.DB);
}

export * from "@safe-fin/db";
export * from "@safe-fin/db/schema";
