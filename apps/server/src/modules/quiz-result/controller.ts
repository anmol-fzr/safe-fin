import { zValidator } from "@hono/zod-validator";
import { getDb, quizQuestionResult, userQuizResult } from "@/db";
import { createTypedFactory } from "../../factory";
import { quizResultReqSchema } from "./schema";

const { createHandlers } = createTypedFactory();

const saveQuizResult = createHandlers(
	zValidator("json", quizResultReqSchema),
	async (c) => {
		const body = c.req.valid("json");

		const db = getDb(c.env);
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
			message: "Quiz Result Saved Successfully",
		});
	},
);

export { saveQuizResult };
