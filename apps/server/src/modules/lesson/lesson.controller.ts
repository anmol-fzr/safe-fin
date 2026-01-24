import { zValidator } from "@hono/zod-validator";
import type { DB } from "@safe-fin/db";
import { env } from "hono/adapter";
import { z } from "zod";
import { createTypedFactory } from "@/factory";
import { authenticate, db, paginate, userRole } from "@/middleware";
import { s3 } from "@/middleware/s3";
import { courseProgress } from "@/pkg/db";
import { dbIdSchema, idParamSchema } from "@/schema";
import { SavedService } from "../saved/saved.service";
import {
	createCourseSchema,
	getLessonsQueryParamSchema,
	publishCourseSchema,
	updateCourseSchema,
} from "./lesson.schema";
import { LessonService } from "./lesson.service";

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
	s3,
	zValidator("param", courseIdParamSchema),
	async (c) => {
		const { courseId } = c.req.valid("param");
		const user = c.get("user");
		const db = c.get("db");
		const s3Config = c.get("s3");

		const includeUnpublished = user.role === "admin";
		const lesson = await LessonService.getById(
			db,
			courseId,
			includeUnpublished,
			user.id,
			s3Config,
		);

		if (!lesson) {
			return c.json({ error: "Lesson not found" }, 404);
		}

		return c.json({ data: lesson });
	},
);

export const saveCourseProgressHandler = createHandlers(
	authenticate,
	db,
	zValidator(
		"json",
		z.object({
			courseId: idParamSchema,
			chapterId: idParamSchema,
			unitId: idParamSchema,
		}),
	),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		const data = c.req.valid("json");

		await db
			.insert(courseProgress)
			.values({
				userId: user.id,
				courseId: data.courseId,
				currChapterId: data.chapterId,
				currUnitId: data.unitId,
			})
			.onConflictDoNothing();

		return c.json({ data: { success: true } }, 201);
	},
);

export const createLessonHandler = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("form", createCourseSchema),
	async (c) => {
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

		await SavedService.toggleEntitySave(db, {
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
	zValidator("param", courseIdParamSchema),
	zValidator("json", updateCourseSchema),
	async (c) => {
		const db = c.get("db");

		const { courseId } = c.req.valid("param");
		const data = c.req.valid("json");

		const updatedCourse = await LessonService.updateById(db, courseId, data);

		if (!updatedCourse.success) {
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
// UNIT HANDLERS
// ============================================
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
