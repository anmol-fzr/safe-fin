import { createTypedFactory } from "@/factory";
import { addressRouter } from "@/modules/address";
import { authRouter } from "@/modules/auth";
import { calculatorRouter } from "@/modules/calculator";
import { lessonRouter } from "@/modules/lesson";
import { profileRouter } from "@/modules/profile";
import { quizRouter } from "@/modules/quiz";

const { createApp } = createTypedFactory();
const v1Router = createApp();

v1Router
	.get("/health", (c) => c.text("Hello Hono v1!"))
	.route("/auth", authRouter)
	.route("/quiz", quizRouter)
	.route("/lessons", lessonRouter)
	.route("/calculator", calculatorRouter)
	.route("/address", addressRouter)
	.route("/profile", profileRouter);

export { v1Router };
