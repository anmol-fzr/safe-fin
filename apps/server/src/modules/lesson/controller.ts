import { zValidator } from "@hono/zod-validator";
import { and, asc, count, desc, eq, or } from "drizzle-orm";
import { getDb, lesson, lessonQuiz } from "@/db";
import { authenticate } from "@/middleware";
import { userRole } from "@/middleware/userRole";
import { queryParamSchema } from "@/schema/params";
import { createTypedFactory } from "../../factory";
import {
	createLessonSchema,
	lessonQuizLinkSchema,
	updateLessonSchema,
} from "./schema";

const { createHandlers } = createTypedFactory();

const getLessons = createHandlers(
	zValidator("query", queryParamSchema),
	authenticate,
	async (c) => {
		const { sortBy, sortDirection, limit, offset } = c.req.valid("query");

		const db = getDb(c.env);

		const role = c.get("user").role;
		const isAdmin = role === "admin";

		let where = undefined;
		let fields = undefined;

		if (isAdmin) {
			where = or(eq(lesson.isPublished, true), eq(lesson.isPublished, false));
		} else {
			where = eq(lesson.isPublished, true);
			fields = {
				id: lesson.id,
				title: lesson.title,
				desc: lesson.desc,
				isPublished: lesson.isPublished,
				createdAt: lesson.createdAt,
			};
		}

		fields = {
			id: lesson.id,
			title: lesson.title,
			desc: lesson.desc,
			isPublished: lesson.isPublished,
			createdAt: lesson.createdAt,
		};
		const countPrms = db.select({ count: count() }).from(lesson).where(where);
		const lessonsQuery = db
			.select(fields)
			.from(lesson)
			.where(where)
			.orderBy(
				sortDirection === "desc" ? desc(lesson[sortBy]) : asc(lesson[sortBy]),
			)
			.limit(limit)
			.offset(offset);

		const [countVal, lessons] = await Promise.all([countPrms, lessonsQuery]);

		return c.json({
			data: lessons,
			total: countVal[0].count,
		});
	},
);

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

const updateLessonById = createHandlers(
	authenticate,
	userRole("admin"),
	zValidator("json", updateLessonSchema),
	async (c) => {
		const lessonId = c.req.param("lesson_id");
		const lessonData = c.req.valid("json");

		try {
			const db = getDb(c.env);

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
	},
);

export {
	getLessons,
	getLessonById,
	createLesson,
	deleteLesson,
	updateLessonById,
};
export { linkLessonWithQuiz };
