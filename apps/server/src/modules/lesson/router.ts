import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { lessonRead } from "@/db";
import { authenticate, db } from "@/middleware";
import { createTypedFactory } from "../../factory";
import {
	createLesson,
	deleteLesson,
	getLessonById,
	getLessons,
	linkLessonWithQuiz,
	updateLessonById,
} from "./controller";

const { createApp } = createTypedFactory();

const lessonStatusParamSchema = z.object({
	status: z.enum(["seen", "red"]).default("seen"),
});

const lessonRouter = createApp()
	.get("/", ...getLessons)
	.post("/", ...createLesson)
	.get("/:lesson_id", ...getLessonById)
	.patch("/:lesson_id", ...updateLessonById)
	.delete("/:lesson_id", ...deleteLesson)
	.post("/link", ...linkLessonWithQuiz)
	.post(
		"/:lesson_id/status",
		zValidator("query", lessonStatusParamSchema),
		db,
		authenticate,
		async (c) => {
			const { status } = c.req.valid("query");
			const user = c.get("user");
			const userId = user.id;
			const lessonId = Number(c.req.param("lesson_id"));

			const db = c.get("db");

			try {
				await db
					.insert(lessonRead)
					.values({
						userId,
						lessonId,
						event: status,
					})
					.onConflictDoUpdate({
						target: [lessonRead.userId, lessonRead.lessonId],
						set: {
							event: "red",
						},
					})
					.returning();

				return c.json({ success: true });
			} catch (error) {
				console.error(error);
				return c.json({ success: false }, 400);
			}
		},
	);

export { lessonRouter };
