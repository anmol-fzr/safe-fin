import { Hono } from "hono";
import type { HonoAppProps } from "..";
import {
	createLesson,
	getLessonById,
	getLessons,
	deleteLesson,
	updateLessonById,
	linkLessonWithQuiz,
} from "@/controller/lesson.controller";

const lessonRouter = new Hono<HonoAppProps>()
	.get("/", ...getLessons)
	.get("/:lesson_id", ...getLessonById)
	.patch("/:lesson_id", ...updateLessonById)
	.post("/", ...createLesson)
	.post("/link", ...linkLessonWithQuiz)
	.delete("/:lesson_id", ...deleteLesson);

export { lessonRouter };
