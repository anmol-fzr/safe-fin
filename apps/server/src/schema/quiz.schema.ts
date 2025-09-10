import { z } from "zod";

const dbIdSchema = z.number().int().positive().safe();

const optionSchema = z
	.object({
		value: z.string(),
	})
	.describe("Option");

const optionsSchema = z.array(optionSchema).nonempty().describe("Options");

const questionSchema = z
	.object({
		question: z.string(),
		answer: z.string(),
		options: optionsSchema,
	})
	.describe("Question");

const questionsSchema = z
	.array(questionSchema)
	.nonempty()
	.describe("Questions");

const fullQuizReqSchema = z.object({
	title: z.string().describe("Title of the Quiz"),
	desc: z.string().describe("Description of the Quiz"),
	isPublished: z
		.boolean()
		.default(false)
		.optional()
		.describe("Whether to Publish the Quiz or not"),
	questions: questionsSchema,
});

const quizResultReqSchema = z.object({
	quizId: dbIdSchema,
	result: z.array(
		z.object({
			questionId: dbIdSchema,
			answeredId: dbIdSchema,
		}),
	),
});

export { fullQuizReqSchema, quizResultReqSchema, dbIdSchema };
