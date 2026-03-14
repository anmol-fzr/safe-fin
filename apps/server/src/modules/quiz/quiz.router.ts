import { createTypedFactory } from "../../factory";
import {
	createQuiz,
	getQuizById,
	getQuizzes,
	saveQuizResult,
	updateQuizById,
} from "./quiz.controller";

const { createApp } = createTypedFactory();

const quizRouter = createApp();

quizRouter
	.get("/", ...getQuizzes)
	.post("/", ...createQuiz)
	.get("/:id", ...getQuizById)
	.patch("/:id", ...updateQuizById)
	.post("/result", ...saveQuizResult);

export { quizRouter };
