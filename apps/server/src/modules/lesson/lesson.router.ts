import { createTypedFactory } from "@/factory";
import { chapterRouter } from "./chapter/chapter.router";
import {
	createLessonHandler,
	deleteLesson,
	forYouLessons,
	getAdminCourseOptions,
	getCourseObjectUploadUrl,
	getLastInteractedCourse,
	getLessonById,
	getUserLessons,
	likeCourseHandler,
	publishLesson,
	rateCourseById,
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
	.get("/progress/last", ...getLastInteractedCourse)
	.get("/:courseId", ...getLessonById)
	.patch("/:courseId", ...updateLesson)
	.post("/:courseId/toggle-like", ...likeCourseHandler)
	.delete("/:courseId", ...deleteLesson)
	.patch("/:courseId/publish", ...publishLesson)
	.route("/", chapterRouter)
	.route("/", unitRouter)
	.post("/upload-url", ...getCourseObjectUploadUrl)
	.post("/:courseId/rate", ...rateCourseById);

export { lessonRouter };
