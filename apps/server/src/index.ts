import { Hono } from "hono";
import { cors } from "hono/cors";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import type { Session, User } from "@/auth";
import { auth } from "@/auth";
import { lessonRouter, quizRouter } from "@/router";
import { calculatorRouter } from "./modules/calculator/router.ts";
import { quizResultRouter } from "./router/quizResult.router";

type HonoAppProps = {
	Variables: {
		user: User;
		session: Session;
	};
	Bindings: CloudflareBindings;
};

const app = new Hono<HonoAppProps>();

app.use(logger());

app.use("*", async (c, next) => {
	const corsMiddlewareHandler = cors({
		origin: [c.env.CORS_ORIGIN_URL],
		allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	});
	return corsMiddlewareHandler(c, next);
});

app.get("/health", (c) => c.text("Hello Hono!"));
app.route("/calculator", calculatorRouter);

// app.get(
// 	"*",
// 	cache({
// 		cacheName: "my-app",
// 		cacheControl: "max-age=3600",
// 		vary: "Authorization, Cookie",
// 	}),
// );

app.get("*", etag());

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
	return auth(c.env).handler(c.req.raw);
});

//app.use(authenticate);
const routes = app
	.route("/quiz", quizRouter)
	.route("/lessons", lessonRouter)
	.route("/result", quizResultRouter)
	.get("/env-check", (c) => {
		return c.json({
			env: c.env,
			// url: c.env.TURSO_DB_URL,
			// token: c.env.TURSO_DB_AUTH_TOKEN,
		});
	});

type AppType = typeof routes;

export type { HonoAppProps, AppType };
export default app;
