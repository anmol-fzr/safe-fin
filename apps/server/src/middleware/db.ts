import { createTypedFactory } from "@/factory";
import { type DB, getDb } from "@/pkg/db";

const { createMiddleware } = createTypedFactory<{
	Variables: {
		db: DB;
	};
}>();

const db = createMiddleware(async (c, next) => {
	c.set("db", getDb());

	await next();
});

export { db };
