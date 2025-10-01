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
	.get("/:lesson_id", ...getLessonById)
	.patch("/:lesson_id", ...updateLessonById)
	.post("/", ...createLesson)
	.post("/link", ...linkLessonWithQuiz)
	.delete("/:lesson_id", ...deleteLesson);

export { lessonRouter };
