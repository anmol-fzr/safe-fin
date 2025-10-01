import { calculatorRouter } from "@calulator/router";
import { lessonRouter } from "@lesson/router";
import { quizRouter } from "@quiz/router";
import { quizResultRouter } from "@quiz-result/router";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { auth } from "@/auth";
import { appCors } from "@/middleware";
import { createTypedFactory } from "./factory";

const { createApp } = createTypedFactory();
const app = createApp();

app.use(logger());

app.get("/health", (c) => c.text("Hello Hono!"));

app.use("*", appCors);
app.get("*", etag());

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
	return auth(c.env).handler(c.req.raw);
});

app
	.route("/quiz", quizRouter)
	.route("/lessons", lessonRouter)
	.route("/result", quizResultRouter)
	.route("/calculator", calculatorRouter);

export default app;
