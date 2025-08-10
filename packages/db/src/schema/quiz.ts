import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth";

const id = integer("id").primaryKey({ autoIncrement: true }).notNull();
const timestamp = (colName: string) => integer(colName, { mode: "timestamp" });

export const quiz = sqliteTable("quiz", {
	id,
	title: text("title", { length: 256 }).notNull(),
	desc: text("desc", { length: 256 }).notNull(),
	isPublished: integer("is_published", { mode: "boolean" }).default(false),
	createdAt: timestamp("created_at")
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => new Date())
		.notNull(),
});

export const option = sqliteTable("option", {
	id,
	question_id: integer("question_id").notNull(),
	value: text("value", { length: 100 }),
	createdAt: timestamp("created_at")
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => new Date())
		.notNull(),
});

export const question = sqliteTable("question", {
	id,
	quizId: integer("quiz_id")
		.notNull()
		.references(() => quiz.id),
	question: text("question", { length: 500 }).notNull(),
	answerId: integer("answer_id").references(() => option.id), // refer to option // allows null to get out of loop to create a question with options created
	createdAt: timestamp("created_at")
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => new Date())
		.notNull(),
});

// One Quiz Many Questions
export const quizQuestionsRelations = relations(quiz, ({ many }) => ({
	questions: many(question), // Drizzle infers the name from the property name if not specified or you can keep relationName: "questions"
}));

export const optionRelations = relations(option, ({ one }) => ({
	question: one(question, {
		fields: [option.question_id],
		references: [question.id],
	}),
}));

export const questionOptionsRelations = relations(
	question,
	({ many, one }) => ({
		options: many(option), // Drizzle infers the name from the property name
		answer: one(option, {
			fields: [question.answerId],
			references: [option.id],
		}),
		quiz: one(quiz, {
			fields: [question.quizId],
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
});

export const quizQuestionResult = sqliteTable("quiz_question_result", {
	id,
	questionId: integer("question_id")
		.references(() => question.id)
		.notNull(),
	answeredId: integer("answered_id")
		.references(() => option.id)
		.notNull(),
	userQuizResultId: integer("user_quiz_result_id")
		.references(() => userQuizResult.id)
		.notNull(),
});
