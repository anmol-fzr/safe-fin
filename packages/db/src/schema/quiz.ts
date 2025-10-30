import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";

export const quiz = sqliteTable("quiz", {
	id,
	title: text("title", { length: 256 }).notNull(),
	desc: text("desc", { length: 256 }).notNull(),
	isPublished: integer("is_published", { mode: "boolean" }).default(false),
	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const quizQuestion = sqliteTable("quiz_question", {
	id,
	quizId: integer("quiz_id")
		.notNull()
		.references(() => quiz.id),
	question: text("question", { length: 500 }).notNull(),
	answerId: integer("answer_id").references(() => quizQuestionOption.id), // refer to option // allows null to get out of loop to create a question with options created
	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const quizQuestionOption = sqliteTable("quiz_question_option", {
	id,
	question_id: integer("question_id").notNull(),
	value: text("value", { length: 100 }),
	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});
// One Quiz Many Questions
export const quizQuestionsRelations = relations(quiz, ({ many }) => ({
	questions: many(quizQuestion), // Drizzle infers the name from the property name if not specified or you can keep relationName: "questions"
}));

export const optionRelations = relations(quizQuestionOption, ({ one }) => ({
	question: one(quizQuestion, {
		fields: [quizQuestionOption.question_id],
		references: [quizQuestion.id],
	}),
}));

export const questionOptionsRelations = relations(
	quizQuestion,
	({ many, one }) => ({
		options: many(quizQuestionOption), // Drizzle infers the name from the property name
		answer: one(quizQuestionOption, {
			fields: [quizQuestion.answerId],
			references: [quizQuestionOption.id],
		}),
		quiz: one(quiz, {
			fields: [quizQuestion.quizId],
			references: [quiz.id],
		}),
	}),
);

export const userQuizResult = sqliteTable("user_quiz_result", {
	id,
	quizId: integer("quiz_id")
		.references(() => quiz.id)
		.notNull(),
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),
	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export const quizQuestionResult = sqliteTable("quiz_question_result", {
	id,
	questionId: integer("question_id")
		.references(() => quizQuestion.id)
		.notNull(),
	answeredId: integer("answered_id")
		.references(() => quizQuestionOption.id)
		.notNull(),
	userQuizResultId: integer("user_quiz_result_id")
		.references(() => userQuizResult.id)
		.notNull(),
	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});
