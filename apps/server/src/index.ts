import { addressRouter } from "@address/router";
import { calculatorRouter } from "@calulator/router";
import { lessonRouter } from "@lesson/router";
import { profileRouter } from "@profile/router";
import { quizRouter } from "@quiz/router";
import { quizResultRouter } from "@quiz-result/router";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { auth } from "@/auth";
import { appCors } from "@/middleware";
import { createTypedFactory } from "./factory";

const { createApp } = createTypedFactory();
const app = createApp();

app.use(logger());
app.use(
	"*",
	secureHeaders({
		contentSecurityPolicy: {
			defaultSrc: ["'self'"],
		},
	}),
);
app.use(appCors);

app.get("/health", (c) => c.text("Hello Hono!"));

app.get("*", etag());

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
	return auth(c.env).handler(c.req.raw);
});

app
	.route("/quiz", quizRouter)
	.route("/lessons", lessonRouter)
	.route("/result", quizResultRouter)
	.route("/calculator", calculatorRouter)
	.route("/address", addressRouter)
	.route("/profile", profileRouter);

export default app;
