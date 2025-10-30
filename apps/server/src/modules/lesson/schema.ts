import { z } from "zod";
import { dbIdSchema } from "@/schema";
import { queryParamSchema } from "@/schema/params";

const lessonQuizLinkSchema = z.object({
	lessonId: dbIdSchema,
	quizId: dbIdSchema,
});

const getLessonsQueryParamSchema = queryParamSchema.extend({
	status: z.enum(["seen", "red"]).optional(),
});

export { lessonQuizLinkSchema, getLessonsQueryParamSchema };
