import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";
import { exercise, option, question } from "./exercise";

// ExerciseResult -> QuestionResult
export const exerciseResult = sqliteTable("question_result", {
	id,
	exerciseId: integer("exercise_id")
		.references(() => exercise.id)
		.notNull(),
	userId: integer("user_id")
		.references(() => user.id)
		.notNull(),
	score: integer().notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const questionResult = sqliteTable("question_result", {
	id,
	exerciseResultId: integer("attempt_id")
		.references(() => exerciseResult.id)
		.notNull(),
	questionId: integer("question_id")
		.references(() => question.id)
		.notNull(),
	selectedOption_id: integer("selected_option_id")
		.references(() => option.id)
		.notNull(),
	isCorrect: integer("is_correct", { mode: "boolean" }).notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});
