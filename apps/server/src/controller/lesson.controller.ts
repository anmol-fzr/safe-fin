import { createFactory } from "hono/factory";

import type { HonoAppProps } from "..";
import { authenticate } from "@/middleware";
import { userRole } from "@/middleware/userRole";
import { zValidator } from "@hono/zod-validator";
import {
	createLessonSchema,
	lessonQuizLinkSchema,
} from "@/schema/lesson.schema";
import { lesson, lessonQuiz, getDb } from "@/db";
import { eq, count } from "drizzle-orm";

const { createHandlers } = createFactory<HonoAppProps>();

const getLessons = createHandlers(authenticate, async (c) => {
	const db = getDb(c.env);

	const countPrms = db.select({ count: count() }).from(lesson);
	const lessonsPrms = db.query.lesson.findMany({
		columns: {
			id: true,
			title: true,
			desc: true,
			content: false,
			createdAt: true,
			updatedAt: true,
		},
		orderBy: (lesson, { desc }) => [desc(lesson.createdAt)],
	});

	const [countVal, lessons] = await Promise.all([countPrms, lessonsPrms]);

	return c.json({
		data: lessons,
		total: countVal[0].count,
	});
});

const getLessonById = createHandlers(authenticate, async (c) => {
	const lessonId = c.req.param("lesson_id");

	const db = getDb(c.env);

	const foundLesson = await db.query.lesson.findFirst({
		where: (lesson, { eq }) => eq(lesson.id, lessonId),
		columns: {
			createdAt: false,
		},
		with: {
			quizzes: {
				with: {
					quiz: {
						columns: {
							id: false,
							desc: false,
							createdAt: false,
							updatedAt: false,
							isPublished: false,
						},
					},
				},
			},
		},
	});

	if (foundLesson === undefined) {
		return c.json(
			{
				error: "Lesson Not Found",
				message: "Lesson Not Found",
			},
			404,
		);
	}

	return c.json({
		data: foundLesson,
	});
});

const createLesson = createHandlers(
	authenticate,
	userRole("admin"),
	zValidator("json", createLessonSchema),
	async (c) => {
		const body = c.req.valid("json");

		const db = getDb(c.env);

		const [newLesson] = await db.insert(lesson).values(body).returning();

		return c.json(
			{
				data: newLesson,
				message: "Lesson Added Successfully",
			},
			201,
		);
	},
);

const deleteLesson = createHandlers(
	authenticate,
	userRole("admin"),
	async (c) => {
		const lessonId = c.req.param("lesson_id");

		const db = getDb(c.env);

		const foundLesson = await db.delete(lesson).where(eq(lesson.id, lessonId));

		// Check If There is a Quiz with associated this Lesson
		if (foundLesson.rowsAffected === 0) {
			return c.json(
				{
					error: "Lesson Not Found",
					message: "Lesson Not Found",
				},
				404,
			);
		}

		return c.json({ message: "Lesson Deleted Successfully" });
	},
);

const linkLessonWithQuiz = createHandlers(
	authenticate,
	userRole("admin"),
	zValidator("json", lessonQuizLinkSchema),
	async (c) => {
		const { lessonId, quizId } = c.req.valid("json");
		const db = getDb(c.env);

		try {
			await db.insert(lessonQuiz).values({ lessonId, quizId });
			return c.json({
				message: "Lesson and Quiz Linked Successfully",
			});
		} catch (error) {
			return c.json(
				{
					error,
					message: "Either Lesson or Quiz doesn't exists",
				},
				500,
			);
		}
	},
);

const updateLesson = createHandlers(
	authenticate,
	userRole("admin"),
	async (c) => {
		const lessonId = c.req.param("lesson_id");

		const db = getDb(c.env);

		const foundLesson = await db.delete(lesson).where(eq(lesson.id, lessonId));

		// Check If There is a Quiz with associated this Lesson
		if (foundLesson.rowsAffected === 0) {
			return c.json(
				{
					error: "Lesson Not Found",
					message: "Lesson Not Found",
				},
				404,
			);
		}

		return c.json({ message: "Lesson Deleted Successfully" });
	},
);

export { getLessons, getLessonById, createLesson, deleteLesson };
export { linkLessonWithQuiz };
