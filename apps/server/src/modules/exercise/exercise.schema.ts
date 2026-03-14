import { idParamSchema } from "@/schema";
import { z } from "zod";

const createExerciseSchema = z.object({
	title: z.string(),
	desc: z.string(),
	isPublished: z.boolean().optional().default(false),
	chapterId: z.number(),
});
const exerciseIdParamSchema = z.object({ exerciseId: idParamSchema });

export { createExerciseSchema, exerciseIdParamSchema };
