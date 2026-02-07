import { zValidator } from "@hono/zod-validator";
import type { DB } from "@/pkg/db";
import { z } from "zod";
import { createTypedFactory } from "@/factory";
import { authenticate, db, paginate, userRole } from "@/middleware";
import { s3 } from "@/middleware/s3";
import {
	and,
	chapter,
	course,
	courseProgress,
	courseRating,
	desc,
	eq,
	getDb,
	rating,
	richContent,
	saved,
	sql,
	unit,
	userActivityLog,
} from "@/pkg/db";
import { dbIdSchema, idParamSchema } from "@/schema";
import { SavedService } from "../saved/saved.service";
import {
	createCourseSchema,
	getLessonsQueryParamSchema,
	publishCourseSchema,
	updateCourseSchema,
} from "./lesson.schema";
import { LessonService } from "./lesson.service";
import { UnitService } from "./unit/unit.service";

const { createHandlers } = createTypedFactory();

const courseIdParamSchema = z.object({ courseId: idParamSchema });

export const getUserLessons = createHandlers(
	authenticate,
	db,
	s3,
	zValidator("query", getLessonsQueryParamSchema),
	paginate,
	async (c) => {
		const { status } = c.req.valid("query");
		const { limit, page } = c.get("paginate");
		const user = c.get("user");
		const db = c.get("db");

		const s3Config = c.get("s3");

		const lessons = await LessonService.getLessons(
			db,
			{
				limit,
				page,
				status,
				user,
			},
			s3Config,
		);

		return c.json(lessons);
	},
);

export const forYouLessons = createHandlers(authenticate, db, s3, async (c) => {
	const user = c.get("user");
	const db = c.get("db");
	const s3Config = c.get("s3");

	const lessons = await LessonService.getLessons(
		db,
		{
			limit: 3,
			page: 1,
			user,
		},
		s3Config,
	);

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

		const { courseId, chapterId, unitId } = c.req.valid("json");

		const courseProgressInsertResult = await db
			.insert(courseProgress)
			.values({
				userId: user.id,
				courseId: courseId,
				currChapterId: chapterId,
				currUnitId: unitId,
			})
			.onConflictDoNothing();

		if (courseProgressInsertResult.rowsAffected === 0) {
			return c.json({ data: { success: true } }, 201);
		}

		const foundUnit = await db.query.unit.findFirst({
			where: (units, { eq }) => eq(units.id, unitId),
			columns: {
				points: true,
			},
		});

		const currEarnedPX = foundUnit?.points;

		const today = new Date();
		const date = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate(),
			0,
			0,
			0,
			0,
		);

		await db
			.insert(userActivityLog)
			.values({
				userId: user.id,
				date,
				totalPxEarned: currEarnedPX,
			})
			.onConflictDoUpdate({
				target: [userActivityLog.userId, userActivityLog.date],
				set: {
					totalPxEarned: sql`
		     ${userActivityLog.totalPxEarned} + excluded.total_px
		   `,
				},
			});

		return c.json({ data: { success: true } }, 201);
	},
);

export const getLastInteractedCourse = createHandlers(
	authenticate,
	db,
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		/**
		 * STEP 1:
		 * Find the most recently interacted course
		 * that is NOT fully completed
		 */
		const [row] = await db
			.select({
				courseId: course.id,
				lastInteractedAt: sql<Date>`max(${courseProgress.createdAt})`,
				totalUnits: sql<number>`count(distinct ${unit.id})`,
				completedUnits: sql<number>`
					count(distinct ${courseProgress.currUnitId})
				`,
			})
			.from(courseProgress)
			.innerJoin(course, eq(course.id, courseProgress.courseId))
			.innerJoin(chapter, eq(chapter.courseId, course.id))
			.innerJoin(unit, eq(unit.chapterId, chapter.id))
			.where(eq(courseProgress.userId, user.id))
			.groupBy(course.id)
			.having(
				sql`
					count(distinct ${courseProgress.currUnitId})
					<
					count(distinct ${unit.id})
				`,
			)
			.orderBy(sql`max(${courseProgress.createdAt}) desc`)
			.limit(1);

		/**
		 * No unfinished course found
		 */
		if (!row) {
			return c.json({ data: null });
		}

		/**
		 * STEP 2:
		 * Hydrate course + richContent
		 */
		const courseData = await db.query.course.findFirst({
			where: (c, { eq }) => eq(c.id, row.courseId),
			with: {
				content: {
					columns: {
						title: true,
					},
				},
			},
			columns: {
				id: true,
			},
		});

		if (!courseData) {
			return c.json({ data: null });
		}

		/**
		 * STEP 3:
		 * Compute percentage
		 */
		const percentage =
			row.totalUnits === 0
				? 0
				: Number((row.completedUnits / row.totalUnits).toFixed(2));

		/**
		 * STEP 4:
		 * Final response (frontend-friendly)
		 */
		return c.json({
			data: {
				course: courseData,
				progress: {
					//totalUnits: row.totalUnits,
					//completedUnits: row.completedUnits,
					percentage,
					//lastInteractedAt: row.lastInteractedAt,
				},
			},
		});
	},
);

export const createLessonHandler = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("json", createCourseSchema),
	async (c) => {
		const db = c.get("db");

		const data = c.req.valid("json");
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
	zValidator("param", courseIdParamSchema),
	zValidator("json", publishCourseSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can publish courses
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { courseId } = c.req.valid("param");
		const { isPublished } = c.req.valid("json");

		const result = await LessonService.publishCourse(db, courseId, isPublished);

		return c.json({ data: result });
	},
);

export const deleteLesson = createHandlers(
	authenticate,
	db,
	zValidator("param", courseIdParamSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can delete courses
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { courseId } = c.req.valid("param");
		await LessonService.delete(db, courseId);

		return c.json({ success: true });
	},
);

// ============================================
// LEGACY (to be removed)
// ============================================

const uploadSchema = z.object({
	fileName: z.string(),
	type: z.enum(["cover"]),
});

export const getCourseObjectUploadUrl = createHandlers(
	authenticate,
	userRole("admin"),
	s3,
	zValidator("json", uploadSchema),
	async (c) => {
		const { fileName, type } = c.req.valid("json");
		const storage = c.get("storage");

		const key = `courses/${type}/${crypto.randomUUID()}-${fileName}`;

		const result = await storage.getUploadUrl(key, 600);

		return c.json(result);
	},
);

const rateCourseSchema = z.object({
	rating: z.number().min(1).max(5),
});

export const rateCourseById = createHandlers(
	authenticate,
	db,
	zValidator("param", courseIdParamSchema),
	zValidator("json", rateCourseSchema),
	async (c) => {
		const { rating: starRating } = c.req.valid("json");
		const { courseId } = c.req.valid("param");

		const { id: userId } = c.get("user");

		const db = c.get("db");

		try {
			const ratingResult = await db
				.insert(rating)
				.values({
					rating: starRating,
					userId,
				})
				.returning();
			console.log(ratingResult);

			const courseRatingQuery = db.insert(courseRating).values({
				ratingId: ratingResult[0].id,
				courseId,
			});

			const courseUpdateQuery = await db
				.update(course)
				.set({
					ratingSum: sql`${course.ratingSum} + ${starRating}`,
					rateCount: sql`${course.rateCount} + 1`,
				})
				.where(eq(course.id, courseId));

			await Promise.all([courseRatingQuery, courseUpdateQuery]);
		} catch (error) {
			console.log(error);
		}

		return c.json(
			{
				success: true,
				data: null,
			},
			202,
		);
	},
);
