//import { betterAuthStudioHandler } from "@safe-fin/auth/server";
import { env } from "hono/adapter";
import { etag } from "hono/etag";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { auth } from "@/auth";
import { appCors } from "@/middleware";
import { createTypedFactory } from "./factory";
import { addressRouter } from "./modules/address/router";
import { calculatorRouter } from "./modules/calculator/router";
import { lessonRouter } from "./modules/lesson/router";
import { profileRouter } from "./modules/profile/router";
import { quizRouter } from "./modules/quiz/router";
import { quizResultRouter } from "./modules/quiz-result/router";

const { createApp } = createTypedFactory();
const app = createApp();

app.use(logger());
app.use(
	"*",
	secureHeaders({
		contentSecurityPolicy: {
			//defaultSrc: ["'self'"],
			//scriptSrc: ["self", "https://cdn.jsdelivr.net/npm/@scalar/api-reference"],
			//styleSrc: ["https://fonts.scalar.com"],
		},
	}),
);
app.use(appCors);

// app.on(
// 	["POST", "GET", "PUT", "DELETE"],
// 	"/api/studio/*",
// 	betterAuthStudioHandler,
// );

app.get("/health", (c) => c.text("Hello Hono!"));

app.get("*", etag());

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
	return auth(env(c)).handler(c.req.raw);
});

app
	.route("/quiz", quizRouter)
	.route("/lessons", lessonRouter)
	.route("/result", quizResultRouter)
	.route("/calculator", calculatorRouter)
	.route("/address", addressRouter)
	.route("/profile", profileRouter);

export default app;
