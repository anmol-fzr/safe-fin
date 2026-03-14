import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";
import { exercise, option, question } from "./exercise";

export const exerciseAttempt = sqliteTable("exercise_attempt", {
	id,
	exerciseId: integer("exercise_id")
		.references(() => exercise.id)
		.notNull(),
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const exerciseResult = sqliteTable("exercise_result", {
	id,
	attemptId: integer("attempt_id")
		.references(() => exerciseAttempt.id)
		.notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const questionResult = sqliteTable("question_result", {
	id,
	exerciseResultId: integer("exercise_result_id")
		.references(() => exerciseResult.id)
		.notNull(),
	questionId: integer("question_id")
		.references(() => question.id)
		.notNull(),
	selectedOptionId: integer("selected_option_id")
		.references(() => option.id)
		.notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});
