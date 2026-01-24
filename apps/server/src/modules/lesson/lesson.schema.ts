import { z } from "zod";
import { dbIdSchema, idParamSchema } from "@/schema";
import { queryParamSchema } from "@/schema/params";

export const courseIdParamSchema = z.object({ courseId: idParamSchema });
const courseLevelSchema = z
	.enum(["beginner", "intermediate", "advanced"])
	.default("beginner");

export type CourseLevel = z.infer<typeof courseLevelSchema>;

export const createCourseSchema = z.object({
	title: z.string().min(3).max(256),
	shortDesc: z.string().min(10).max(500),
	longDesc: z.string().min(50),
	longDescJson: z.any(), // JSON content for rich text editor
	isPublished: z.boolean().optional().default(false),
	coverPath: z.string(),
	level: courseLevelSchema,
});

export const updateCourseSchema = z.object({
	title: z.string().min(3).max(256).optional(),
	shortDesc: z.string().min(10).max(500).optional(),
	longDesc: z.string().min(50).optional(),
	longDescJson: z.any().optional(),
	coverPath: z.string(),
	isPublished: z.boolean().optional(),
});

export const publishCourseSchema = z.object({
	isPublished: z.boolean(),
});

// ============================================
// Chapter Schemas
// ============================================

const chapterSchema = z.object({
	//courseId: dbIdSchema,
	title: z.string().min(3).max(256),
	index: z.number().int().min(0),
});

export const createChapterSchema = z.array(chapterSchema).min(1).max(10);

export const updateChapterSchema = z.object({
	title: z.string().min(3).max(256).optional(),
	index: z.number().int().min(0).optional(),
	isPublished: z.boolean().optional(),
});

export const reorderChaptersSchema = z.object({
	courseId: dbIdSchema,
	chapters: z.array(
		z.object({
			id: dbIdSchema,
			index: z.number().int().min(0),
		}),
	),
});

export const getLessonsQueryParamSchema = queryParamSchema.extend({
	status: z.enum(["seen", "red"]).optional(),
});

export const getChapterUnitsQuerySchema = z.object({
	includeUnpublished: z
		.string()
		.transform((val) => val === "true")
		.optional(),
});

const lessonQuizLinkSchema = z.object({
	lessonId: dbIdSchema,
	quizId: dbIdSchema,
});

export { lessonQuizLinkSchema };
