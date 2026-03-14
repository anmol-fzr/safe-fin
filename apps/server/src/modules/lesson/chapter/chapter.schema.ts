import { z } from "zod";
import { dbIdSchema } from "@/schema";

const chapterSchema = z.object({
	//courseId: dbIdSchema,
	title: z.string().min(3).max(256),
	index: z.number().int().min(0),
});

export const createChapterSchema = z.object({
	chapters: z.array(chapterSchema).min(1).max(10),
	isPublished: z.boolean().optional().default(false),
});

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
