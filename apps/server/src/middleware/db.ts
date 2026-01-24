import { env } from "hono/adapter";
import { createTypedFactory } from "@/factory";
import { type DB, getDb } from "@/pkg/db";

const { createMiddleware } = createTypedFactory<{
	Variables: {
		db: DB;
	};
}>();

const db = createMiddleware(async (c, next) => {
	const { DB_URL, DB_TOKEN } = env(c);
	const creds = { DB_URL, DB_TOKEN };

	c.set("db", getDb(creds));
	await next();
});

export { db };
