import { zValidator } from "@hono/zod-validator";
import { lesson, lessonQuiz, lessonRead } from "@safe-fin/db/schema";
import type {
	LessonInsertSchema,
	LessonUpdateSchema,
} from "@safe-fin/schema/server";
import {
	and,
	asc,
	count,
	desc,
	eq,
	isNull,
	ne,
	notInArray,
	or,
} from "drizzle-orm";
import { env } from "hono/adapter";
import { Adapter } from "@/adapter";
import type { DB } from "@/db";
import { getDb } from "@/db";
import { authenticate, db, getPaginateRes, paginate } from "@/middleware";
import { userRole } from "@/middleware/userRole";
import { queryParamSchema } from "@/schema/params";
import { createTypedFactory } from "../../factory";
import { LESSON_ERROR_CODES } from "./errors.ts";
import { LessonQuery } from "./lesson-repository";
import {
	getLessonsQueryParamSchema,
	lessonQuizLinkSchema,
	updateLessonSchema,
} from "./schema";

const { createHandlers, createMiddleware } = createTypedFactory();

interface GetLessons {
	sortBy: string;
	sortDirection: string;
	limit: number;
	page: number;
	status: "seen" | "red";
	user: {
		id: string;
		role: "admin" | "user";
	};
}

export const getLessons = async (
	db,
	{ sortBy, sortDirection, limit, page, status, user }: GetLessons,
) => {
	const offset = (page - 1) * limit;

	const { id, role } = user;

	const isAdmin = role === "admin";

	const queryBuilder = new LessonQuery(db);
	queryBuilder.paginate(page, limit);

	if (status) {
		queryBuilder.filterByStatus(id, status);
	}

	if (!isAdmin) {
		queryBuilder.findPublishedOnly();
		queryBuilder.select({
			id: lesson.id,
			title: lesson.title,
			desc: lesson.desc,
			content: lesson.content,
			// contentJson: false,
			// createdAt: false,
			// updatedAt: false,
		});
	}

	const query = queryBuilder.build();
	const countQuery = queryBuilder.countQuery();

	const [countVal, lessons] = await Promise.all([countQuery, query]);

	const total = countVal[0].count;

	return {
		data: lessons,
		paginate: getPaginateRes({ total, offset, limit }),
	};
};

const createLesson = async (db: DB, data: LessonInsertSchema) => {
	const [inserted] = await db.insert(lesson).values(data).returning();

	return inserted;
};

const deleteLesson = createHandlers(
	authenticate,
	userRole("admin"),
	async (c) => {
		const lessonId = c.req.param("lesson_id");

		const db = getDb(env(c));

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
		const db = getDb(env(c));

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

const updateLessonById = async (db) => {
	const lessonId = c.req.param("lesson_id");
	const lessonData = c.req.valid("json");

	try {
		const db = getDb(env(c));

		const foundLesson = await db
			.update(lesson)
			.set(lessonData)
			.where(eq(lesson.id, lessonId));

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

		return c.json({ message: "Lesson Updated Successfully" });
	} catch (error) {
		return c.json({ message: "Unable to Update Lesson", error });
	}
};

export class LessonAdapter extends Adapter {
	db: DB;

	constructor(db: DB) {
		super();
		this.db = db;
	}

	async getById(lessonId: number) {
		const foundLesson = await this.db.query.lesson.findFirst({
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

		return foundLesson;
	}

	async create(data: LessonInsertSchema) {
		const [inserted] = await this.db.insert(lesson).values(data).returning();

		return inserted;
	}

	async updateById(lessonId: number, data: LessonUpdateSchema) {
		const updatedLesson = await this.db
			.update(lesson)
			.set(data)
			.where(eq(lesson.id, lessonId));

		return updatedLesson;
	}
}

export { createLesson, deleteLesson, updateLessonById };
export { linkLessonWithQuiz };
