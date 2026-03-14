import { every } from "hono/combine";
import { showRoutes } from "hono/dev";
import { logger } from "hono/logger";
import { timeout } from "hono/timeout";
import { appCache, appCors, appCsp } from "@/middleware";
import { v1Router } from "./api/v1/router";
import { setupMonitoring } from "./config/monitoring";
import { createTypedFactory } from "./factory";

const { createApp } = createTypedFactory();
const app = createApp();

app.use(every(logger(), appCors, appCsp, appCache, timeout(5_000)));

app.get("/health", (c) => c.text("Hello Hono!")).route("/api/v1", v1Router);

showRoutes(app, {
	verbose: true,
	colorize: true,
});

export default setupMonitoring(app);
