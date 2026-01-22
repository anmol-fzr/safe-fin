import { createTypedFactory } from "@/factory";
import {
	createChapter,
	createLessonHandler,
	createUnits,
	deleteChapter,
	deleteLesson,
	deleteUnit,
	forYouLessons,
	getChapterById,
	getChapterUnits,
	getCourseChapters,
	getLessonById,
	getUnitById,
	getUserLessons,
	likeCourseHandler,
	linkLessonWithQuiz,
	publishLesson,
	reorderChapters,
	reorderUnits,
	saveCourseProgressHandler,
	updateChapter,
	updateLesson,
	updateUnit,
} from "./lesson.controller";

const { createApp } = createTypedFactory();

const lessonRouter = createApp()
	.get("/for-you", ...forYouLessons)
	.get("/", ...getUserLessons)
	.get("/:courseId", ...getLessonById)
	.post("/", ...createLessonHandler)
	.post("/progress", ...saveCourseProgressHandler)
	.post("/:courseId/toggle-like", ...likeCourseHandler)
	.patch("/:courseId", ...updateLesson)
	.patch("/:id/publish", ...publishLesson)
	.delete("/:id", ...deleteLesson)

	.get("/:courseId/chapters", ...getCourseChapters)
	.post("/:courseId/chapters", ...createChapter)
	.post("/chapters/reorder", ...reorderChapters)
	.get("/chapters/:id", ...getChapterById)
	.patch("/chapters/:id", ...updateChapter)
	.delete("/chapters/:id", ...deleteChapter)

	.get("/chapters/:chapterId/units", ...getChapterUnits)
	.post("/chapters/:chapterId/units", ...createUnits)
	.post("/units/reorder", ...reorderUnits)
	.get("/units/:unitId", ...getUnitById)
	.patch("/units/:unitId", ...updateUnit)
	.delete("/units/:id", ...deleteUnit)

	// ============================================
	// LEGACY ROUTES (deprecated)
	// ============================================
	.post("/link", ...linkLessonWithQuiz); // Deprecated - returns 410

export { lessonRouter };
