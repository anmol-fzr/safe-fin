import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory();

const appCors = createMiddleware(async (c, next) => {
	const corsMiddlewareHandler = cors({
		origin: [env(c).CORS_ORIGIN_URL],
		allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	});
	return corsMiddlewareHandler(c, next);
});

export { appCors };
