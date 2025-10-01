import { createTypedFactory } from "../../factory";
import {
	createQuiz,
	deleteQuizById,
	getQuizById,
	getQuizzes,
	updateQuizById,
} from "./controller";

const { createApp } = createTypedFactory();

const quizRouter = createApp()
	.get("/", ...getQuizzes)
	.post(...createQuiz)
	.get("/:quiz_id", ...getQuizById)
	.patch(...updateQuizById)
	.delete(...deleteQuizById);
//.route("/result", quizResultRouter);

export { quizRouter };
