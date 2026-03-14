import { createTypedFactory } from "@/factory";
import { authenticate, userRole } from "@/middleware";
import {
	exerciseAttempt,
	exerciseResult,
	getDb,
	publicUserProfile,
	questionResult,
	eq,
	sql,
} from "@/pkg/db";
import { zValidator } from "@hono/zod-validator";
import z from "zod";
import { exerciseIdParamSchema } from "../exercise.schema";

const { createHandlers } = createTypedFactory();

const saveExerciseResultSchema = z.object({
	results: z
		.array(
			z.object({
				questionId: z.number(),
				selectedOptionId: z.number(),
				answerId: z.number(),
			}),
		)
		.max(25),
});

export const saveExerciseResult = createHandlers(
	authenticate,
	userRole("user"),
	zValidator("json", saveExerciseResultSchema),
	zValidator("param", exerciseIdParamSchema),
	async (c) => {
		const db = getDb();

		const { exerciseId } = c.req.valid("param");
		const body = c.req.valid("json");
		const { id: userId } = c.get("user");

		const foundExercise = await db.query.exercise.findFirst({
			where: (exercises, { eq }) => eq(exercises.id, exerciseId),
			columns: {
				points: true,
			},
		});

		if (!foundExercise) {
			return c.json(
				{
					message: "Exercise Not Found",
				},
				404,
			);
		}

		const attempt = await db
			.insert(exerciseAttempt)
			.values({
				exerciseId,
				userId,
			})
			.returning();

		const exerciseResultObj = await db
			.insert(exerciseResult)
			.values({
				attemptId: attempt[0].id,
			})
			.returning();

		const questionResultPayload: {
			exerciseResultId: number;
			questionId: number;
			selectedOptionId: number;
		}[] = [];

		let correctCount = 0;

		body.results.forEach((result) => {
			questionResultPayload.push({
				exerciseResultId: exerciseResultObj[0].id,
				questionId: result.questionId,
				selectedOptionId: result.selectedOptionId,
			});

			if (result.selectedOptionId === result.answerId) {
				correctCount++;
			}
		});

		const correctRatio = correctCount / body.results.length;

		const pointIncrement = Math.round(foundExercise.points * correctRatio);

		const questionResultInsertQuery = db
			.insert(questionResult)
			.values(questionResultPayload);

		const profilePXUpdateQuery = db
			.update(publicUserProfile)
			.set({
				totalPX: sql`${publicUserProfile.totalPX} + ${pointIncrement}`,
			})
			.where(eq(publicUserProfile.userId, userId));

		await Promise.all([questionResultInsertQuery, profilePXUpdateQuery]);

		return c.json({
			message: `Boom! +${pointIncrement} points ⚡`,
		});
	},
);

export const getExerciseResult = createHandlers(
	authenticate,
	userRole("user"),
	zValidator("param", exerciseIdParamSchema),
	async (c) => {
		const db = getDb();

		const { exerciseId } = c.req.valid("param");
		const { id: userId } = c.get("user");

		const attempt = await db.query.exerciseAttempt.findMany({
			where: (attempts, { eq, and }) =>
				and(eq(attempts.exerciseId, exerciseId), eq(attempts.userId, userId)),
			orderBy: (attemtps, { desc }) => desc(attemtps.createdAt),
			columns: {},
			with: {
				result: {
					columns: { id: true, createdAt: true },
					with: {
						questions: {
							columns: {
								id: true,
								selectedOptionId: true,
							},
							with: {
								question: {
									columns: {
										id: true,
										question: true,
										reason: true,
									},
									with: {
										options: {
											columns: {
												id: true,
												value: true,
											},
										},
										answer: {
											columns: {
												id: true,
												value: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		return c.json({
			data: attempt,
		});
	},
);
