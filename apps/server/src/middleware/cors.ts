import { cors } from "hono/cors";
import { envs } from "@/utils/envs";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory();

const appCors = createMiddleware(async (c, next) => {
	const corsMiddlewareHandler = cors({
		origin: [envs.CORS_ORIGIN_URL],
		allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	});
	return corsMiddlewareHandler(c, next);
});

export { appCors };
