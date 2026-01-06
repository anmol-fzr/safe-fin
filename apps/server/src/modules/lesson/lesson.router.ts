import { createTypedFactory } from "@/factory";
import {
	createLessonHandler,
	deleteLesson,
	getLessonById,
	getRecentInteractedLesson,
	getUserLessons,
	linkLessonWithQuiz,
	updateLesson,
} from "./lesson.controller";
import { lessonStatusRouter } from "./status/lesson-status.router";

const { createApp } = createTypedFactory();

const lessonRouter = createApp()
	.get("/last", ...getRecentInteractedLesson)
	.get("/", ...getUserLessons)
	.post("/", ...createLessonHandler)
	.get("/:id", ...getLessonById)
	.patch("/:id", ...updateLesson)
	.delete("/:id", ...deleteLesson)
	.post("/link", ...linkLessonWithQuiz)
	.route("/status", lessonStatusRouter);

export { lessonRouter };
