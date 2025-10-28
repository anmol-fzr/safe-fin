import { env } from "hono/adapter";
import { getDb } from "@/db";
import { createTypedFactory } from "@/factory";

const { createMiddleware } = createTypedFactory<{
	Variables: {
		db: ReturnType<typeof getDb>;
	};
}>();

const db = createMiddleware(async (c, next) => {
	c.set("db", getDb(env(c)));
	await next();
});

export { db };
