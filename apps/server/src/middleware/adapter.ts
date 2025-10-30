import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { Adapter } from "@/adapter";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory();

const setAdapter = (NewAdapter: Adapter) => {
	return createMiddleware(async (c, next) => {
		const db = c.get("db");

		if (!db) {
			throw new Error(
				"DB not available, `setAdapter` middleware must be used after `db` middleware",
			);
		}

		c.set("adapter", new NewAdapter(db));
		await next();
	});
};

export { setAdapter };
