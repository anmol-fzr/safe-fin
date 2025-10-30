import { relations } from "drizzle-orm";
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";
import { quiz } from "./quiz";

const lesson = sqliteTable("lesson", {
	id,
	title: text("title", { length: 256 }).notNull(),
	desc: text("description").notNull(),
	isPublished: integer("is_published", { mode: "boolean" }).default(false),
	content: text("content").notNull(),
	contentJson: text("content_json"),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

const lessonQuiz = sqliteTable("lesson_quiz", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	lessonId: integer("lesson_id")
		.notNull()
		.references(() => lesson.id),
	quizId: integer("quiz_id")
		.notNull()
		.references(() => quiz.id),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
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

export const lessonRead = sqliteTable(
	"lesson_read",
	{
		userId: text("user_id")
			.references(() => user.id)
			.notNull(),
		lessonId: integer("lesson_id")
			.references(() => lesson.id)
			.notNull(),
		event: text("event", { enum: ["seen", "red"] })
			.default("seen")
			.notNull(),

		// for this table only, created_at will simple be seet_at timestamp
		createdAt: timestamp.createdAt,
		// updated_at will simple be read_at timestamp
		updated_at: timestamp.updatedAt,
	},
	(table) => [primaryKey({ columns: [table.userId, table.lessonId] })],
);

export const lessonReadRelations = relations(lessonRead, ({ one }) => ({
	user: one(user, {
		fields: [lessonRead.userId],
		references: [user.id],
	}),
	lesson: one(lesson, {
		fields: [lessonRead.lessonId],
		references: [lesson.id],
	}),
}));

export { lesson, lessonQuiz };
