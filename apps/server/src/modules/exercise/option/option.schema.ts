import { idParamSchema } from "@/schema";
import { z } from "zod";

const createOptionSchema = z
	.object({
		value: z.string().describe("Option Value"),
		questionId: z.number(),
	})
	.strict();

const optionIdParamSchema = z.object({ optionId: idParamSchema });

export { createOptionSchema, optionIdParamSchema };
