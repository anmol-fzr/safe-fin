import { Factory } from "hono/factory";
import type { HonoAppProps } from "..";
import {
	getQuizzes,
	getQuizById,
	createQuiz,
	updateQuizById,
	deleteQuizById,
} from "@/controller";

const { createApp } = new Factory<HonoAppProps>();

const quizRouter = createApp()
	.get("/", ...getQuizzes)
	.post(...createQuiz)
	.get("/:quiz_id", ...getQuizById)
	.patch(...updateQuizById)
	.delete(...deleteQuizById);
//.route("/result", quizResultRouter);

export { quizRouter };
