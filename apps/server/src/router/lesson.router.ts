import { Hono } from "hono";
import type { HonoAppProps } from "..";
import {
	createLesson,
	getLessonById,
	getLessons,
	deleteLesson,
	linkLessonWithQuiz,
} from "@/controller/lesson.controller";
import { authenticate } from "@/middleware";
import { getDb } from "@/db";

const lessonRouter = new Hono<HonoAppProps>()
	.get("/", ...getLessons)
	.get("/:lesson_id", ...getLessonById)
	.post("/", ...createLesson)
	.post("/link", ...linkLessonWithQuiz)
	.delete("/:lesson_id", ...deleteLesson);

export { lessonRouter };
