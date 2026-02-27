import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { appCors } from "@/middleware";
import { v1Router } from "./api/v1/router";
import { setupMonitoring } from "./config/monitoring";
import { createTypedFactory } from "./factory";

const { createApp } = createTypedFactory();
const app = createApp();

app
	.use(logger())
	.use(
		"*",
		secureHeaders({
			contentSecurityPolicy: {
				defaultSrc: ["'self'"],
				scriptSrc: ["self"],
			},
		}),
	)
	.use(appCors);

app.use("*", async (c, next) => {
	c.header(
		"Cache-Control",
		"public, must-revalidate, s-maxage=300, max-age=300",
	);
	c.header("Vary", "Authorization");
	await next();
});

app.get("/health", (c) => c.text("Hello Hono!")).route("/api/v1", v1Router);

showRoutes(app, {
	verbose: true,
	colorize: true,
});

export default setupMonitoring(app);
