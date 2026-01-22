import { createTypedFactory } from "@/factory";
import { authenticate, db } from "@/middleware";
import { addressRouter } from "@/modules/address";
import { authRouter } from "@/modules/auth";
import { calculatorRouter } from "@/modules/calculator";
import { lessonRouter } from "@/modules/lesson";
import { savedRouter } from "@/modules/saved";
import storageRouter from "@/modules/storage/storage.controller";

import { profileRouter } from "@/modules/profile";
//import { quizRouter } from "@/modules/quiz";

const { createApp } = createTypedFactory();
const v1Router = createApp();

v1Router
	.get("/health", (c) => c.text("Hello Hono v1!"))
	.route("/auth", authRouter)
	//.route("/quiz", quizRouter)
	.route("/courses", lessonRouter)
	.route("/calculator", calculatorRouter)
	.route("/saved", savedRouter)
	.route("/storage", storageRouter)
	.route("/profile", profileRouter)
	.route("/address", addressRouter);

export { v1Router };
