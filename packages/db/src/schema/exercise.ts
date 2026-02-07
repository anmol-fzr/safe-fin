import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { chapter } from "./course";

// Exercise -> Question -> Option
export const exercise = sqliteTable("exercise", {
	id,
	coverPath: text("cover_path"),

	title: text().notNull(),
	desc: text().notNull(),

	chapterId: integer("chapter_id")
		.references(() => chapter.id)
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

	reason: text().notNull(),
	answerId: integer("answer_id"), // refers to option.id
	index: integer().notNull().default(0),

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
	index: integer().notNull().default(0),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});
