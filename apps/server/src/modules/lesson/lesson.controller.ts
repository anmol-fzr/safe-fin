import { zValidator } from "@hono/zod-validator";
import type { DB } from "@safe-fin/db";
import { z } from "zod";
import { createTypedFactory } from "@/factory";
import { authenticate, db, paginate, userRole } from "@/middleware";
import { and, eq, saved } from "@/pkg/db";
import { dbIdSchema, idParamSchema } from "@/schema";
import { toggleEntitySave } from "../saves/saves.controller";
import {
	createChapterSchema,
	createCourseSchema,
	createUnitSchema,
	getChapterUnitsQuerySchema,
	getCourseChaptersQuerySchema,
	getLessonsQueryParamSchema,
	publishCourseSchema,
	reorderChaptersSchema,
	reorderUnitsSchema,
	updateChapterSchema,
	updateCourseSchema,
	updateUnitSchema,
} from "./lesson.schema";
import { ChapterService, LessonService } from "./lesson.service";
import { UnitService } from "./unit/unit.service";

const { createHandlers } = createTypedFactory();

const courseIdParamSchema = z.object({ courseId: idParamSchema });

export const getUserLessons = createHandlers(
	authenticate,
	db,
	zValidator("query", getLessonsQueryParamSchema),
	paginate,
	async (c) => {
		const { status } = c.req.valid("query");
		const { limit, page } = c.get("paginate");
		const user = c.get("user");
		const db = c.get("db");

		const lessons = await LessonService.getLessons(db, {
			limit,
			page,
			status,
			user,
		});

		return c.json(lessons);
	},
);

export const forYouLessons = createHandlers(authenticate, db, async (c) => {
	const user = c.get("user");
	const db = c.get("db");

	const lessons = await LessonService.getLessons(db, {
		limit: 3,
		page: 1,
		user,
	});

	return c.json({ data: lessons.data });
});

export const getLessonById = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ courseId: idParamSchema })),
	async (c) => {
		const { courseId } = c.req.valid("param");
		const user = c.get("user");
		const db = c.get("db");

		const includeUnpublished = user.role === "admin";
		const lesson = await LessonService.getById(
			db,
			courseId,
			includeUnpublished,
		);

		if (!lesson) {
			return c.json({ error: "Lesson not found" }, 404);
		}

		return c.json({ data: lesson });
	},
);

export const createLessonHandler = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("form", createCourseSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		const data = c.req.valid("form");
		const newCourse = await LessonService.create(db, data);

		return c.json({ data: newCourse }, 201);
	},
);

export const likeCourseHandler = createHandlers(
	authenticate,
	db,
	zValidator("param", courseIdParamSchema),
	async (c) => {
		const { id: userId } = c.get("user");
		const db = c.get("db");
		const { courseId } = c.req.valid("param");

		await toggleEntitySave(db, {
			entityId: courseId,
			entityType: "course",
			userId,
		});

		return c.json({ data: { success: true } }, 201);
	},
);

export const updateLesson = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("param", z.object({ courseId: idParamSchema })),
	zValidator("json", updateCourseSchema),
	async (c) => {
		const db = c.get("db");

		const { courseId } = c.req.valid("param");
		const data = c.req.valid("json");

		const updatedCourse = await LessonService.updateById(db, courseId, data);

		if (!updatedCourse) {
			return c.json({ error: "Course not found" }, 404);
		}

		return c.json({ data: updatedCourse });
	},
);

export const publishLesson = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	zValidator("json", publishCourseSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can publish courses
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { id } = c.req.valid("param");
		const { isPublished } = c.req.valid("json");

		const result = await LessonService.publishCourse(db, id, isPublished);

		return c.json({ data: result });
	},
);

export const deleteLesson = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can delete courses
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { id } = c.req.valid("param");
		await LessonService.delete(db, id);

		return c.json({ success: true });
	},
);

// ============================================
// CHAPTER HANDLERS
// ============================================

export const getCourseChapters = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ courseId: dbIdSchema })),
	zValidator("query", getCourseChaptersQuerySchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");
		const { courseId } = c.req.valid("param");
		const { includeUnpublished } = c.req.valid("query");

		const canSeeUnpublished = user.role === "admin" && includeUnpublished;
		const chapters = await ChapterService.getChaptersByCourseId(
			db,
			courseId,
			canSeeUnpublished,
		);

		return c.json({ data: chapters });
	},
);

export const getChapterById = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");
		const { id } = c.req.valid("param");

		const includeUnpublished = user.role === "admin";
		const chapter = await ChapterService.getById(db, id, includeUnpublished);

		if (!chapter) {
			return c.json({ error: "Chapter not found" }, 404);
		}

		return c.json({ data: chapter });
	},
);

export const createChapter = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("json", createChapterSchema),
	zValidator("param", z.object({ courseId: idParamSchema })),
	async (c) => {
		const db = c.get("db");
		const { courseId } = c.req.valid("param");

		const chaptersData = c.req.valid("json");

		const newChapters = await ChapterService.create(db, {
			courseId,
			chapters: chaptersData,
		});

		return c.json({ data: newChapters }, 201);
	},
);

export const updateChapter = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	zValidator("json", updateChapterSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can update chapters
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { id } = c.req.valid("param");
		const data = c.req.valid("json");

		const updatedChapter = await ChapterService.updateById(db, id, data);

		if (!updatedChapter) {
			return c.json({ error: "Chapter not found" }, 404);
		}

		return c.json({ data: updatedChapter });
	},
);

export const reorderChapters = createHandlers(
	authenticate,
	db,
	zValidator("json", reorderChaptersSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can reorder chapters
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { chapters } = c.req.valid("json");
		const result = await ChapterService.reorderChapters(db, chapters);

		return c.json({ data: result });
	},
);

export const deleteChapter = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can delete chapters
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { id } = c.req.valid("param");
		await ChapterService.delete(db, id);

		return c.json({ success: true });
	},
);

// ============================================
// UNIT HANDLERS
// ============================================

export const getChapterUnits = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ chapterId: dbIdSchema })),
	zValidator("query", getChapterUnitsQuerySchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");
		const { chapterId } = c.req.valid("param");
		const { includeUnpublished } = c.req.valid("query");

		const canSeeUnpublished = user.role === "admin" && includeUnpublished;
		const units = await UnitService.getUnitsByChapterId(
			db,
			chapterId,
			canSeeUnpublished,
		);

		return c.json({ data: units });
	},
);

export const getUnitById = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ unitId: idParamSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");
		const { unitId } = c.req.valid("param");

		const isAdmin = user.role === "admin";
		const unit = await UnitService.getById(db, unitId, isAdmin);

		if (!unit) {
			return c.json({ error: "Unit not found" }, 404);
		}

		return c.json({ data: unit });
	},
);

export const createUnits = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("param", z.object({ chapterId: idParamSchema })),
	zValidator("json", createUnitSchema),
	async (c) => {
		const db = c.get("db");

		const data = c.req.valid("json");
		const { chapterId } = c.req.valid("param");
		const newUnits = await UnitService.create(db, {
			chapterId,
			units: data,
		});

		return c.json({ data: newUnits }, 201);
	},
);

export const updateUnit = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("param", z.object({ unitId: idParamSchema })),
	zValidator("json", updateUnitSchema),
	async (c) => {
		const db = c.get("db");

		const { unitId } = c.req.valid("param");
		const data = c.req.valid("json");

		const updatedUnit = await UnitService.updateById(db, unitId, data);

		if (!updatedUnit) {
			return c.json({ error: "Unit not found" }, 404);
		}

		return c.json({ data: updatedUnit });
	},
);

export const reorderUnits = createHandlers(
	authenticate,
	db,
	zValidator("json", reorderUnitsSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can reorder units
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { units } = c.req.valid("json");
		const result = await UnitService.reorderUnits(db, units);

		return c.json({ data: result });
	},
);

export const deleteUnit = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can delete units
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { id } = c.req.valid("param");
		await UnitService.delete(db, id);

		return c.json({ success: true });
	},
);

// ============================================
// LEGACY (to be removed)
// ============================================

export const linkLessonWithQuiz = createHandlers(
	authenticate,
	db,
	async (c) => {
		return c.json(
			{
				error:
					"This endpoint is deprecated. Exercises are now linked to units, not courses.",
			},
			410,
		);
	},
);
