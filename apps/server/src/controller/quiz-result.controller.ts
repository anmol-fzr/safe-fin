import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";

import type { HonoAppProps } from "..";
import { getDb } from "@/db";
import { quizQuestionResult, userQuizResult } from "@/db";
import { quizResultReqSchema } from "@/schema";

const factory = createFactory<HonoAppProps>();

const saveQuizResult = factory.createHandlers(
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
