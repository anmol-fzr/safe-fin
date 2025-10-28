import { createTypedFactory } from "../../factory";
import {
	createLesson,
	deleteLesson,
	getLessonById,
	getLessons,
	linkLessonWithQuiz,
	updateLessonById,
} from "./controller";
import { lessonStatusRouter } from "./status/router.ts";

const { createApp } = createTypedFactory();

const lessonRouter = createApp()
	.get("/", ...getLessons)
	.post("/", ...createLesson)
	.get("/:lesson_id", ...getLessonById)
	.patch("/:lesson_id", ...updateLessonById)
	.delete("/:lesson_id", ...deleteLesson)
	.post("/link", ...linkLessonWithQuiz)
	.route("/", lessonStatusRouter);

export { lessonRouter };
