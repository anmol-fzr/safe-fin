import { env } from "hono/adapter";
import type { Session, User } from "@/pkg/auth";
import { auth } from "@/pkg/auth";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory<{
	Variables: {
		user?: User;
		session?: Session;
	};
}>();

const weakAuthenticate = createMiddleware(async (c, next) => {
	const session = await auth(env(c)).api.getSession({
		headers: c.req.raw.headers,
	});

	c.set("user", session?.user);
	c.set("session", session?.session);

	return await next();
});

export { weakAuthenticate };
