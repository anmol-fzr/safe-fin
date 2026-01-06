import { zValidator } from "@hono/zod-validator";
import {
	lessonInsertSchema,
	updateLessonSchema,
} from "@safe-fin/schema/server";
import { createTypedFactory } from "@/factory";
import { authenticate, db, paginate, userRole } from "@/middleware";
import { itemIdSchema } from "@/schema/params";
import { LESSON_CODES, LessonErrors } from "./lesson.codes";
import {
	getLessonsQueryParamSchema,
	lessonQuizLinkSchema,
} from "./lesson.schema";
import { LessonService } from "./lesson.service";

const { createHandlers } = createTypedFactory();

export const getRecentInteractedLesson = createHandlers(
	authenticate,
	db,
	async (c) => {
		const { id: userId } = c.get("user");
		const db = c.get("db");

		const lastLesson = await LessonService.getRecentInteracted(db, userId);

		if (!lastLesson) {
			return c.json({ data: null });
		}

		const lessonWords = lastLesson.content.split(" ").length ?? 0;
		const readMinutes = Math.round(lessonWords / 100);

		return c.json({
			data: {
				title: lastLesson.title,
				updatedAt: lastLesson.updatedAt,
				readMinutes,
			},
		});
	},
);

export const getUserLessons = createHandlers(
	zValidator("query", getLessonsQueryParamSchema),
	paginate,
	authenticate,
	db,
	async (c) => {
		const db = c.get("db");
		const pagination = c.get("paginate");
		const { id, role } = c.get("user");

		const response = await LessonService.getLessons(db, {
			...pagination,
			user: {
				id,
				role,
			},
		});
		return c.json(response);
	},
);

export const getLessonById = createHandlers(
	authenticate,
	db,
	zValidator("param", itemIdSchema),
	async (c) => {
		const db = c.get("db");
		const { id: lessonId } = c.req.valid("param");

		const foundLesson = await LessonService.getById(db, lessonId);

		if (!foundLesson) {
			return LessonErrors.NotFound();
		}

		return c.json({
			data: foundLesson,
		});
	},
);

export const createLessonHandler = createHandlers(
	userRole("admin"),
	zValidator("json", lessonInsertSchema),
	db,
	async (c) => {
		const data = c.req.valid("json");
		const db = c.get("db");
		const newLesson = await LessonService.create(db, data);

		return c.json(
			{
				data: newLesson,
				message: LESSON_CODES.CREATE.SUCCESS,
			},
			201,
		);
	},
);

export const updateLesson = createHandlers(
	userRole("admin"),
	zValidator("param", itemIdSchema),
	zValidator("json", updateLessonSchema),
	db,
	async (c) => {
		const { id: lessonId } = c.req.valid("param");
		const lessonData = c.req.valid("json");
		const db = c.get("db");

		try {
			const foundLesson = await LessonService.updateById(
				db,
				lessonId,
				lessonData,
			);

			if (foundLesson.rowsAffected === 0) {
				return LessonErrors.NotFound();
			}

			return c.json({ message: LESSON_CODES.UPDATE.SUCCESS });
		} catch (error) {
			return c.json({ message: LESSON_CODES.UPDATE.ERROR, error });
		}
	},
);

export const deleteLesson = createHandlers(
	authenticate,
	userRole("admin"),
	zValidator("param", itemIdSchema),
	db,
	async (c) => {
		const { id: lessonId } = c.req.valid("param");
		const db = c.get("db");

		const foundLesson = await LessonService.delete(db, lessonId);

		if (foundLesson.rowsAffected === 0) {
			return LessonErrors.NotFound();
		}

		return c.json({ message: LESSON_CODES.DELETE.SUCCESS });
	},
);

export const linkLessonWithQuiz = createHandlers(
	authenticate,
	userRole("admin"),
	zValidator("json", lessonQuizLinkSchema),
	db,
	async (c) => {
		const { lessonId, quizId } = c.req.valid("json");
		const db = c.get("db");

		try {
			await LessonService.linkWithQuiz(db, lessonId, quizId);
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
