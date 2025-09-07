import { z } from "zod";
import { dbIdSchema } from "./quiz.schema.ts";

const lessonSchema = z.object({
	title: z.string().describe("Title of the Lesson"),
	desc: z.string().describe("Desc of the Lesson"),
	isPublished: z
		.boolean()
		.default(false)
		.optional()
		.describe("Whether to Publish the Lesson or not"),
	content: z.string().describe("Desc of the Lesson"),
	contentJson: z.string().describe("Desc of the Lesson"),
});

const lessonQuizLinkSchema = z.object({
	lessonId: dbIdSchema,
	quizId: dbIdSchema,
});

const createLessonSchema = lessonSchema;

export { createLessonSchema, lessonQuizLinkSchema };
