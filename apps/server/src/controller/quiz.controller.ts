import { createFactory } from "hono/factory";
import { eq, desc } from "drizzle-orm";

import type { HonoAppProps } from "..";
import { getDb } from "@/db";
import { option, question, quiz } from "@/db";
import { zValidator } from "@hono/zod-validator";
import { fullQuizReqSchema } from "@/schema";

const factory = createFactory<HonoAppProps>();

const getQuizzes = factory.createHandlers(async (c) => {
	const db = getDb(c.env);

	const quizzes = await db
		.select({
			id: quiz.id,
			title: quiz.title,
			desc: quiz.desc,
			createdAt: quiz.createdAt,
			updatedAt: quiz.updatedAt,
		})
		.from(quiz)
		.where(eq(quiz.isPublished, true))
		.orderBy(desc(quiz.createdAt));

	return c.json({ data: quizzes });
});

const getQuizById = factory.createHandlers(async (c) => {
	const db = getDb(c.env);
	const quizId = c.req.param("quiz_id");

	const quizs = await db.query.quiz.findFirst({
		where: (quiz) => eq(quiz.id, quizId),
		columns: {
			isPublished: false,
			createdAt: false,
			updatedAt: false,
		},
		with: {
			questions: {
				columns: {
					createdAt: false,
					updatedAt: false,
				},
				with: {
					options: {
						columns: {
							createdAt: false,
							updatedAt: false,
						},
					},
					answer: {
						columns: {
							createdAt: false,
							updatedAt: false,
						},
					},
				},
			},
		},
	});

	return c.json({ data: quizs });
});

const updateQuizById = factory.createHandlers(async (c) => {
	const quizId = c.req.param("quiz_id");
	const db = getDb(c.env);

	const updatedQuiz = await db
		.update(quiz)
		.set({
			isPublished: true,
		})
		.where(eq(quiz.id, quizId))
		.returning();

	if (updatedQuiz.length === 0) {
		return c.json(
			{
				data: null,
				error: "Quiz Not Found",
				message: "Quiz Doesn't Exists",
			},
			404,
		);
	}

	return c.json({ data: updatedQuiz[0], message: "Quiz Updated Successfully" });
});

const deleteQuizById = factory.createHandlers(async (c) => {
	const quizId = c.req.param("quiz_id");
	const db = getDb(c.env);

	const foundQuiz = db.select().from(quiz).where(eq(quiz.id, quizId)).limit(1);

	// const quiz = await db.query.quiz.findFirst({
	//   where: (quiz) => eq(quiz.id, quizId),
	// })

	return c.json({ data: foundQuiz });
});

const createQuiz = factory.createHandlers(
	zValidator("json", fullQuizReqSchema),
	async (c) => {
		const { title, desc, isPublished = false } = c.req.valid("json");
		const db = getDb(c.env);

		try {
			const newQuiz = await db.transaction(async (tx) => {
				const quizBody = { title, desc, isPublished };

				const [insertedQuiz] = await tx
					.insert(quiz)
					.values(quizBody)
					.returning();
				const newQuizId = insertedQuiz.id;

				for (const questionData of body.questions) {
					const insertedQuestion = await tx
						.insert(question)
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
						.insert(option)
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
						.update(question)
						.set({ answerId: answerOption.id })
						.where(eq(question.id, questionId));
				}

				return insertedQuiz; // return full quiz object
			});
			return c.json({ data: newQuiz });
		} catch (error) {
			console.error("Transaction failed:", error);
			return c.json({ success: false, error: error.message }, 500);
		}
	},
);

export { getQuizzes, getQuizById, createQuiz, updateQuizById, deleteQuizById };
