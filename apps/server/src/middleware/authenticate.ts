import { auth } from "@/auth";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory();

const authenticate = createMiddleware(async (c, next) => {
	const session = await auth(c.env).api.getSession({
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
	return next();
});

export { authenticate };
