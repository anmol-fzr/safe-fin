import { type DB, desc, eq, quiz } from "@/pkg/db";

export const QuizService = {
	getQuizzesForUser: (db: DB) => {
		const query = db
			.select()
			.from(quiz)
			.orderBy(desc(quiz.createdAt))
			.where(eq(quiz.isPublished, true));

		return query;
	},
	getQuizzesForAdmin: (db: DB) => {
		const query = db.select().from(quiz).orderBy(desc(quiz.createdAt));

		return query;
	},

	getFullQuizById: (db: DB, quizId: number) => {
		const query = db.query.quiz.findFirst({
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

		return query;
	},

	updateQuizById: (db: DB, quizId: number) => {
		return db
			.update(quiz)
			.set({
				isPublished: true,
			})
			.where(eq(quiz.id, quizId))
			.returning();
	},
};
