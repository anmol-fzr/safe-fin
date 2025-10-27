import { relations } from "drizzle-orm";
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { timestamp } from "./__utils";
import { user } from "./auth";
import { quiz } from "./quiz";

const lesson = sqliteTable("lesson", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	title: text("title", { length: 256 }).notNull(),
	desc: text("description").notNull(),
	isPublished: integer("is_published", { mode: "boolean" }).default(false),
	content: text("content").notNull(),
	contentJson: text("content_json"),

	createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
		() => new Date(),
	),
	updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
		() => new Date(),
	),
});

const lessonQuiz = sqliteTable("lesson_quiz", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	lessonId: integer("lesson_id")
		.notNull()
		.references(() => lesson.id),
	quizId: integer("quiz_id")
		.notNull()
		.references(() => quiz.id),
});

// Relation for lesson → lessonQuiz
export const lessonRelations = relations(lesson, ({ many }) => ({
	quizzes: many(lessonQuiz),
}));

// Relation for quiz → lessonQuiz
export const quizRelations = relations(quiz, ({ many }) => ({
	lessons: many(lessonQuiz),
}));

// Relation for lessonQuiz → lesson & quiz
export const lessonQuizRelations = relations(lessonQuiz, ({ one }) => ({
	lesson: one(lesson, {
		fields: [lessonQuiz.lessonId],
		references: [lesson.id],
	}),
	quiz: one(quiz, {
		fields: [lessonQuiz.quizId],
		references: [quiz.id],
	}),
}));

export const lessonReads = sqliteTable(
	"lesson_reads",
	{
		userId: text("user_id")
			.references(() => user.id)
			.notNull(),
		lessonId: text("lesson_id")
			.references(() => lesson.id)
			.notNull(),
		event: text("event", { enum: ["view", "seen"] })
			.default("view")
			.notNull(),

		// for this table only, created_at will simple be seet_at timestamp
		createdAt: timestamp.createdAt,
		// updated_at will simple be read_at timestamp
		updated_at: timestamp.updatedAt,
	},
	(table) => [primaryKey({ columns: [table.userId, table.lessonId] })],
);

export const lessonReadsRelations = relations(lessonReads, ({ one }) => ({
	user: one(user, {
		fields: [lessonReads.userId],
		references: [user.id],
	}),
	lesson: one(lesson, {
		fields: [lessonReads.lessonId],
		references: [lesson.id],
	}),
}));

export { lesson, lessonQuiz };
