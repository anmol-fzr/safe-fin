import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { unit } from "./course";

// Exercise -> Question -> Option
export const exercise = sqliteTable("exercise", {
	id,
	unitId: integer("unit_id")
		.references(() => unit.id)
		.notNull(),
	isPublished: integer("is_published", { mode: "boolean" }).default(false),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const question = sqliteTable("question", {
	id,
	exerciseId: integer("exercise_id")
		.references(() => exercise.id)
		.notNull(),
	question: text().notNull(),
	answerId: integer("answer_id"), // refers to option.id
	isPublished: integer("is_published", { mode: "boolean" }).default(false),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const option = sqliteTable("option", {
	id,
	questionId: integer("question_id")
		.references(() => question.id)
		.notNull(),
	value: text().notNull(),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});
