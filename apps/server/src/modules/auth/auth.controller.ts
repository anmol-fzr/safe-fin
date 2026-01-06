import { env } from "hono/adapter";
import { auth } from "@/pkg/auth";
import { createTypedFactory } from "@/factory";

const { createHandlers } = createTypedFactory();

const authHandler = createHandlers(async (c) => {
	return auth(env(c)).handler(c.req.raw);
});

export { authHandler };
