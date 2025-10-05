import { createTypedFactory } from "../../factory";
import {
	createLesson,
	deleteLesson,
	getLessonById,
	getLessons,
	linkLessonWithQuiz,
	updateLessonById,
} from "./controller";

const { createApp } = createTypedFactory();

const lessonRouter = createApp()
	.get("/", ...getLessons)
	.post("/", ...createLesson)
	.get("/:lesson_id", ...getLessonById)
	.patch("/:lesson_id", ...updateLessonById)
	.delete("/:lesson_id", ...deleteLesson)
	.post("/link", ...linkLessonWithQuiz);

export { lessonRouter };
