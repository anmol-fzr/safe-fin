import { z } from "zod";
import { dbIdSchema } from "@/schema";

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

export const createUnitSchema = z.object({
	units: z.array(unitSchema).min(1).max(100),
	isPublished: z.boolean().optional().default(false),
});

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

export const getChapterUnitsQuerySchema = z.object({
	includeUnpublished: z
		.string()
		.transform((val) => val === "true")
		.optional(),
});
