import { idParamSchema } from "@/schema";
import { z } from "zod";

const createQuestionSchema = z
	.object({
		question: z.string(),
		reason: z.string().describe("hint/reason"),
		isPublished: z.boolean().optional().default(false),
		index: z.number().default(0),
		exerciseId: z.number(),
	})
	.strict();

const questionIdParamSchema = z.object({ questionId: idParamSchema });

export { createQuestionSchema, questionIdParamSchema };
