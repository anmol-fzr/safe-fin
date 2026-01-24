import { createTypedFactory } from "@/factory";
import { chapterRouter } from "./chapter/chapter.router";
import {
	createLessonHandler,
	deleteLesson,
	forYouLessons,
	getLessonById,
	getUserLessons,
	likeCourseHandler,
	linkLessonWithQuiz,
	publishLesson,
	saveCourseProgressHandler,
	updateLesson,
} from "./lesson.controller";
import { unitRouter } from "./unit/unit.router";

const { createApp } = createTypedFactory();

const lessonRouter = createApp()
	.get("/", ...getUserLessons)
	.post("/", ...createLessonHandler)
	.get("/for-you", ...forYouLessons)
	.post("/progress", ...saveCourseProgressHandler)
	.get("/:courseId", ...getLessonById)
	.patch("/:courseId", ...updateLesson)
	.post("/:courseId/toggle-like", ...likeCourseHandler)
	.delete("/:id", ...deleteLesson)
	.patch("/:id/publish", ...publishLesson)
	.route("/", chapterRouter)
	.route("/", unitRouter)
	.post("/link", ...linkLessonWithQuiz); // Deprecated - returns 410

export { lessonRouter };
