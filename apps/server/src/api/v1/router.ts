import { createTypedFactory } from "@/factory";
import { addressRouter } from "@/modules/address";
import { authRouter } from "@/modules/auth";
import { calculatorRouter } from "@/modules/calculator";
import { lessonRouter } from "@/modules/lesson";
import { profileRouter } from "@/modules/profile";
import { savedRouter } from "@/modules/saved";
import { scamRouter } from "@/modules/scam";
import { streakRouter } from "@/modules/streak";
import { exerciseRouter } from "@/modules/exercise";

//import { quizRouter } from "@/modules/quiz";

const { createApp } = createTypedFactory();
const v1Router = createApp();

v1Router
	.get("/health", (c) => c.text("Hello Hono v1!"))
	.route("/auth", authRouter)
	//.route("/quiz", quizRouter)
	.route("/courses", lessonRouter)
	.route("/exercise", exerciseRouter)
	.route("/calculator", calculatorRouter)
	.route("/saved", savedRouter)
	.route("/profile", profileRouter)
	.route("/address", addressRouter)
	.route("/scam", scamRouter)
	.route("/streak", streakRouter);

export { v1Router };
