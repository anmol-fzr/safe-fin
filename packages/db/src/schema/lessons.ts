import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
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

export { lesson, lessonQuiz };
