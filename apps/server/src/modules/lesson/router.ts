import { zValidator } from "@hono/zod-validator";
import { lessonRead } from "@safe-fin/db/schema";
import {
	lessonInsertSchema,
	updateLessonSchema,
} from "@safe-fin/schema/server";
import { desc } from "drizzle-orm";
import { authenticate, db, paginate, userRole } from "@/middleware";
import { setAdapter } from "@/middleware/adapter";
import { createTypedFactory } from "../../factory";
import {
	createLesson,
	deleteLesson,
	getLessons,
	LessonAdapter,
	linkLessonWithQuiz,
} from "./controller";
import { LESSON_CODES, LessonErrors } from "./errors";
import { getLessonsQueryParamSchema } from "./schema";
import { lessonStatusRouter } from "./status/router";

const { createApp } = createTypedFactory();

const lessonRouter = createApp()
	.use(authenticate)
	.use(db)
	.get("/last", async (c) => {
		const { id: userId } = c.get("user");
		const db = c.get("db");

		const lastSeen = await db.query.lessonRead.findFirst({
			where: (lessonReads, { eq, and }) =>
				and(eq(lessonReads.userId, userId), eq(lessonReads.event, "seen")),
			orderBy: desc(lessonRead.createdAt),
			columns: {
				lessonId: true,
			},
		});

		if (lastSeen === undefined) {
			return c.json({ data: null });
		}

		const lastLesson = await db.query.lesson.findFirst({
			where: (lessons, { eq, and }) =>
				and(eq(lessons.id, lastSeen.lessonId), eq(lessons.isPublished, true)),
			columns: {
				title: true,
				updatedAt: true,
				content: true,
			},
		});

		const lessonWords = lastLesson?.content.split(" ").length ?? 0;
		const readMinutes = Math.round(lessonWords / 100);

		return c.json({
			data: {
				title: lastLesson?.title,
				updatedAt: lastLesson?.updatedAt,
				readMinutes,
			},
		});
	})
	.use(setAdapter(LessonAdapter))
	.get(
		"/",
		zValidator("query", getLessonsQueryParamSchema),
		paginate,
		async (c) => {
			const db = c.get("db");
			const pagination = c.get("paginate");
			const { id, role } = c.get("user");

			const response = await getLessons(db, {
				...pagination,
				user: {
					id,
					role,
				},
			});
			return c.json(response);
		},
	)
	.get("/:lesson_id", async (c) => {
		const db = c.get("db");
		const lessonId = c.req.param("lesson_id");

		const adapter = c.get("adapter");

		const foundLesson = await adapter.getById(lessonId);

		if (foundLesson === undefined) {
			return LessonErrors.NotFound();
		}

		return c.json({
			data: foundLesson,
		});
	})
	.patch(
		"/:lesson_id",
		userRole("admin"),
		zValidator("json", updateLessonSchema),
		async (c) => {
			const lessonId = c.req.param("lesson_id");
			const lessonData = c.req.valid("json");

			const adapter = c.get("adapter");

			try {
				const foundLesson = await adapter.updateById(lessonId, lessonData);

				if (foundLesson.rowsAffected === 0) {
					return LessonErrors.NotFound();
				}

				return c.json({ message: "Lesson Updated Successfully" });
			} catch (error) {
				return c.json({ message: "Unable to Update Lesson", error });
			}
		},
	)
	.delete("/:lesson_id", ...deleteLesson)
	.post("/link", ...linkLessonWithQuiz)
	.post(
		"/",
		userRole("admin"),
		zValidator("json", lessonInsertSchema),
		async (c) => {
			const data = c.req.valid("json");
			const db = c.get("db");
			const newLesson = await createLesson(db, data);

			return c.json(
				{
					data: newLesson,
					message: LESSON_CODES.LESSON_ADDED,
				},
				201,
			);
		},
	)
	.route("/", lessonStatusRouter);

export { lessonRouter };
