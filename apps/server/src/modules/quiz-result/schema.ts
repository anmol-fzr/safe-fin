import { z } from "zod";
import { dbIdSchema } from "@/schema";

const quizResultReqSchema = z.object({
	quizId: dbIdSchema,
	result: z.array(
		z.object({
			questionId: dbIdSchema,
			answeredId: dbIdSchema,
		}),
	),
});

export { quizResultReqSchema };
