import { env } from "cloudflare:workers";
import { createTypedFactory } from "@/factory";
import { type DB, getDevDb, getProdDb } from "@/pkg/db";

const { createMiddleware } = createTypedFactory<{
	Variables: {
		db: DB;
	};
}>();

const db = createMiddleware(async (c, next) => {
	const { DB, DB_URL, DB_TOKEN } = env;

	if (DB_URL && DB_TOKEN) {
		c.set("db", getDevDb({ DB_URL, DB_TOKEN }));
	} else if (DB) {
		c.set("db", getProdDb(DB));
	} else {
		throw new Error("No database configuration found");
	}

	await next();
});

export { db };
