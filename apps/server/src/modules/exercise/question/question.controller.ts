import { createTypedFactory } from "@/factory";
import { zValidator } from "@hono/zod-validator";
import { QuestionService } from "./question.service";
import { createQuestionSchema } from "./question.schema";
import { QUESTION_CODES } from "./question.codes";

const { createHandlers } = createTypedFactory();

const service = new QuestionService();

export const createQuestion = createHandlers(
	zValidator("json", createQuestionSchema),
	async (c) => {
		const body = c.req.valid("json");

		const result = await service.create(body);

		return result.match(
			(questions) => {
				return c.json({
					data: questions.data,
					message: QUESTION_CODES.CREATE.SUCCESS,
				});
			},
			(error) => {
				console.log(error);

				return c.json({
					data: null,
					message: QUESTION_CODES.CREATE.ERROR,
				});
			},
		);
	},
);
