import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { appCors, paginate } from "@/middleware";
import { v1Router } from "./api/v1/router";
import { createTypedFactory } from "./factory";

const { createApp, createMiddleware } = createTypedFactory();
const app = createApp();

app
	.use(logger())
	.use(
		"*",
		secureHeaders({
			contentSecurityPolicy: {
				//defaultSrc: ["'self'"],
				//scriptSrc: ["self", "https://cdn.jsdelivr.net/npm/@scalar/api-reference"],
				//styleSrc: ["https://fonts.scalar.com"],
			},
		}),
	)
	.use(appCors);

app.use("*", async (c, next) => {
	c.header("Cache-Control", "public max-age=86400");
	await next();
});

app
	.get("/health", (c) => c.text("Hello Hono!"))
	.route("/api/v1", v1Router)
	.notFound((c) => {
		console.warn("Remove this Generic Not Found !!!");
		return c.json({
			data: [],
			paginate: {
				total: 0,
				hasMore: false,
				nextPage: null,
			},
		});
	});

showRoutes(app, {
	verbose: true,
	colorize: true,
});

export default app;
