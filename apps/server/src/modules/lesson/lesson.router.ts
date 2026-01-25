import { createTypedFactory } from "@/factory";
import { chapterRouter } from "./chapter/chapter.router";
import {
	createLessonHandler,
	deleteLesson,
	forYouLessons,
	getCourseObjectUploadUrl,
	getLessonById,
	getUserLessons,
	likeCourseHandler,
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
	.delete("/:courseId", ...deleteLesson)
	.patch("/:courseId/publish", ...publishLesson)
	.route("/", chapterRouter)
	.route("/", unitRouter)
	.post("/upload-url", ...getCourseObjectUploadUrl);

export { lessonRouter };
