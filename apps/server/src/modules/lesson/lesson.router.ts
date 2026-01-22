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
	// ============================================
	// COURSE ROUTES
	// ============================================
	.get("/for-you", ...forYouLessons) // Get user's last interacted course
	.get("/", ...getUserLessons) // Get all courses (paginated)
	.get("/:courseId", ...getLessonById) // Get course by ID with chapters
	.post("/", ...createLessonHandler) // Create new course (admin only)
	.post("/progress", ...saveCourseProgressHandler) // Create new course (admin only)
	.post("/:courseId/toggle-like", ...likeCourseHandler) // Create new course (admin only)
	.patch("/:courseId", ...updateLesson) // Update course (admin only)
	.patch("/:id/publish", ...publishLesson) // Publish/unpublish course (admin only)
	.delete("/:id", ...deleteLesson) // Delete course (admin only)

	// ============================================
	// CHAPTER ROUTES
	// ============================================
	.get("/:courseId/chapters", ...getCourseChapters)
	.post("/:courseId/chapters", ...createChapter)
	.post("/chapters/reorder", ...reorderChapters) // Reorder chapters (admin only)
	.get("/chapters/:id", ...getChapterById) // Get chapter by ID with units
	.patch("/chapters/:id", ...updateChapter) // Update chapter (admin only)
	.delete("/chapters/:id", ...deleteChapter) // Delete chapter (admin only)
	// ============================================
	// UNIT ROUTES
	// ============================================
	.get("/chapters/:chapterId/units", ...getChapterUnits) // Get all units for a chapter
	.post("/chapters/:chapterId/units", ...createUnits) // Create new unit (admin only)
	.post("/units/reorder", ...reorderUnits) // Reorder units (admin only)
	.get("/units/:unitId", ...getUnitById) // Get unit by ID
	.patch("/units/:unitId", ...updateUnit) // Update unit (admin only)
	.delete("/units/:id", ...deleteUnit) // Delete unit (admin only)

	// ============================================
	// LEGACY ROUTES (deprecated)
	// ============================================
	.post("/link", ...linkLessonWithQuiz); // Deprecated - returns 410

export { lessonRouter };
