import { z } from "zod";
import { dbIdSchema } from "@/schema";
import { queryParamSchema } from "@/schema/params";

// ============================================
// Course Schemas
// ============================================

export const createCourseSchema = z.object({
	title: z.string().min(3).max(256),
	shortDesc: z.string().min(10).max(500),
	longDesc: z.string().min(50),
	longDescJson: z.any(), // JSON content for rich text editor
});

export const updateCourseSchema = z.object({
	title: z.string().min(3).max(256).optional(),
	shortDesc: z.string().min(10).max(500).optional(),
	longDesc: z.string().min(50).optional(),
	longDescJson: z.any().optional(),
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

type T = z.infer<typeof reorderChaptersSchema>;

// ============================================
// Unit Schemas
// ============================================

const unitSchema = z.object({
	title: z.string().min(3).max(256),
	shortDesc: z.string().min(10).max(500),
	longDesc: z.object({
		content: z.string().min(50),
		contentJson: z.any(),
	}),
	coverPath: z.string().url().optional(),
	points: z.number().int().min(0).default(10),
	index: z.number().int().min(0),
});

export const createUnitSchema = z.array(unitSchema).min(1).max(100);

// export const createUnitSchema = z.object({
// 	chapterId: dbIdSchema,
// 	title: z.string().min(3).max(256),
// 	shortDesc: z.string().min(10).max(500),
// 	content: z.string().min(50),
// 	contentJson: z.any(),
// 	coverPath: z.string().url().optional(),
// 	points: z.number().int().min(0).default(10),
// 	index: z.number().int().min(0).optional(),
// });

export const updateUnitSchema = z.object({
	title: z.string().min(3).max(256).optional(),
	shortDesc: z.string().min(10).max(500).optional(),
	content: z.string().min(50).optional(),
	contentJson: z.any().optional(),
	coverPath: z.string().url().optional(),
	points: z.number().int().min(0).optional(),
	index: z.number().int().min(0).optional(),
	isPublished: z.boolean().optional(),
});

export const reorderUnitsSchema = z.object({
	chapterId: dbIdSchema,
	units: z.array(
		z.object({
			id: dbIdSchema,
			index: z.number().int().min(0),
		}),
	),
});

// ============================================
// Query Schemas
// ============================================

export const getLessonsQueryParamSchema = queryParamSchema.extend({
	status: z.enum(["seen", "red"]).optional(),
});

export const getCourseChaptersQuerySchema = z.object({
	includeUnpublished: z
		.string()
		.transform((val) => val === "true")
		.optional(),
});

export const getChapterUnitsQuerySchema = z.object({
	includeUnpublished: z
		.string()
		.transform((val) => val === "true")
		.optional(),
});

// ============================================
// Legacy (to be removed)
// ============================================

const lessonQuizLinkSchema = z.object({
	lessonId: dbIdSchema,
	quizId: dbIdSchema,
});

export { lessonQuizLinkSchema };
