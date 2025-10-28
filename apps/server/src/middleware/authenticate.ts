import { env } from "hono/adapter";
import type { Session, User } from "@/auth";
import { auth } from "@/auth";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory<{
	Variables: {
		user: User;
		session: Session;
	};
}>();

const authenticate = createMiddleware(async (c, next) => {
	const session = await auth(env(c)).api.getSession({
		headers: c.req.raw.headers,
	});

	if (!session) {
		return c.json(
			{
				error: "Unauthorized",
			},
			401,
		);
	}

	c.set("user", session.user);
	c.set("session", session.session);
	return await next();
});

export { authenticate };
