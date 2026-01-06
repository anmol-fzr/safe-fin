import { zValidator } from "@hono/zod-validator";
import {
	quiz,
	quizQuestion,
	quizQuestionOption,
	quizQuestionResult,
	userQuizResult,
} from "@safe-fin/db/schema";
import { createTypedFactory } from "@/factory";
import { authenticate, db, userRole } from "@/middleware";
import { eq } from "@/pkg/db";
import { isUndefined } from "@/pkg/utils";
import { itemIdSchema } from "@/schema/params";
import { QUIZ_CODES, QuizErrors } from "./quiz.codes";
import { fullQuizReqSchema, quizResultReqSchema } from "./quiz.schema";
import { QuizService } from "./quiz.service";

const { createHandlers } = createTypedFactory();

export const getQuizzes = createHandlers(authenticate, db, async (c) => {
	const db = c.get("db");
	const user = c.get("user");

	let query = QuizService.getQuizzesForUser(db);

	if (user.role === "admin") {
		query = QuizService.getQuizzesForAdmin(db);
	}

	const quizzes = await Promise.resolve(query);

	return c.json({ data: quizzes });
});

export const getQuizById = createHandlers(
	authenticate,
	db,
	zValidator("param", itemIdSchema),
	async (c) => {
		const db = c.get("db");
		const { id: quizId } = c.req.valid("param");

		const foundQuiz = await QuizService.getFullQuizById(db, quizId);

		if (isUndefined(foundQuiz)) {
			return QuizErrors.NotFound();
		}

		return c.json({ data: foundQuiz });
	},
);

export const updateQuizById = createHandlers(
	zValidator("param", itemIdSchema),
	authenticate,
	userRole("admin"),
	db,
	async (c) => {
		const { id: quizId } = c.req.valid("param");
		const db = c.get("db");

		const updatedQuiz = await QuizService.updateQuizById(db, quizId);

		if (updatedQuiz.length === 0) {
			return QuizErrors.NotFound();
		}

		return c.json({
			data: updatedQuiz[0],
			message: QUIZ_CODES.UPDATE.SUCCESS,
		});
	},
);

export const createQuiz = createHandlers(
	zValidator("json", fullQuizReqSchema),
	authenticate,
	userRole("admin"),
	db,
	async (c) => {
		const { title, desc, isPublished = false, questions } = c.req.valid("json");
		const db = c.get("db");

		try {
			const newQuiz = await db.transaction(async (tx) => {
				const quizBody = { title, desc, isPublished };

				const [insertedQuiz] = await tx
					.insert(quiz)
					.values(quizBody)
					.returning();
				const newQuizId = insertedQuiz.id;

				for (const questionData of questions) {
					const insertedQuestion = await tx
						.insert(quizQuestion)
						.values({
							quizId: newQuizId,
							question: questionData.question,
							answerId: null,
						})
						.returning();

					const questionId = insertedQuestion[0].id;

					const optionsBody = questionData.options.map((option) => ({
						value: option.value,
						question_id: questionId,
					}));

					const insertedOptions = await tx
						.insert(quizQuestionOption)
						.values(optionsBody)
						.returning();

					const answerOption = insertedOptions.find(
						(opt) => opt.value === questionData.answer,
					);

					if (!answerOption) {
						throw new Error(
							`Answer "${questionData.answer}" not found in options for question "${questionData.question}"`,
						);
					}

					await tx
						.update(quizQuestion)
						.set({ answerId: answerOption.id })
						.where(eq(quizQuestion.id, questionId));
				}

				return insertedQuiz; // return full quiz object
			});
			return c.json({ data: newQuiz, message: QUIZ_CODES.CREATE.SUCCESS });
		} catch (error) {
			console.error("Transaction failed:", error);
			return c.json(
				{
					success: false,
					error: error?.message,
					message: QUIZ_CODES.CREATE.ERROR,
				},
				500,
			);
		}
	},
);

export const saveQuizResult = createHandlers(
	zValidator("json", quizResultReqSchema),
	authenticate,
	db,
	async (c) => {
		const body = c.req.valid("json");

		const db = c.get("db");
		const user = c.get("user");

		const savedQuizResult = await db
			.insert(userQuizResult)
			.values({
				quizId: body.quizId,
				userId: user.id,
			})
			.returning();

		const results = body.result.map((quizResult) => {
			return { ...quizResult, userQuizResultId: savedQuizResult[0].id };
		});

		await db.insert(quizQuestionResult).values(results).returning();
		const result = savedQuizResult[0];

		return c.json({
			data: result,
			message: QUIZ_CODES.RESULT_SAVE.SUCCESS,
		});
	},
);
