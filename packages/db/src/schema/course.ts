import {
	index,
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";
import { id, timestamp } from "./__utils";
import { user } from "./auth";
import { rating } from "./rating";
import { richContent } from "./rich-content";

// Course -> Chapter -> Unit
export const course = sqliteTable("course", {
	id,
	contentId: integer("content_id")
		.references(() => richContent.id)
		.notNull(),
	coverPath: text("cover_path"),

	level: text("level", {
		enum: ["beginner", "intermediate", "advanced"],
	})
		.default("beginner")
		.notNull(),
	isPublished: integer("is_published", { mode: "boolean" }).default(false),
	ratingSum: integer("ratingSum").default(0),
	rateCount: integer("rate_count").default(0),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export type InsertCourse = Omit<
	typeof course.$inferInsert,
	"createdAt" | "updatedAt"
>;

/*
 * ONE Course can have MANY Chapter
 * */

export const chapter = sqliteTable("chapter", {
	id,
	courseId: integer("course_id")
		.references(() => course.id)
		.notNull(),

	title: text().notNull(),
	index: integer().notNull().default(0),

	isPublished: integer("is_published", { mode: "boolean" }).default(false),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export type InsertChapter = Omit<
	typeof chapter.$inferInsert,
	"createdAt" | "updatedAt"
>;

/*
 * ONE Chapter can have MANY Unit
 * */

export const unit = sqliteTable("unit", {
	id,
	coverPath: text("cover_path"),

	contentId: integer("content_id")
		.references(() => richContent.id)
		.notNull(),
	chapterId: integer("chapter_id")
		.references(() => chapter.id)
		.notNull(),
	points: integer().notNull(),
	index: integer(),

	isPublished: integer("is_published", { mode: "boolean" }).default(false),

	createdAt: timestamp.createdAt,
	updatedAt: timestamp.updatedAt,
});

export type InsertUnit = Omit<
	typeof unit.$inferInsert,
	"createdAt" | "updatedAt"
>;

export const courseProgress = sqliteTable(
	"course_progress",
	{
		userId: text("user_id")
			.references(() => user.id)
			.notNull(),
		courseId: integer("course_id")
			.references(() => course.id)
			.notNull(),
		currChapterId: integer("curr_chapter_id")
			.references(() => chapter.id)
			.notNull(),
		currUnitId: integer("curr_unit_id")
			.references(() => unit.id)
			.notNull(),
		isCompleted: integer("is_completed", { mode: "boolean" }).default(false),

		createdAt: timestamp.createdAt,
		updatedAt: timestamp.updatedAt,
	},

	(t) => ({
		pk: primaryKey({
			columns: [t.userId, t.courseId, t.currChapterId, t.currUnitId],
		}),
		userEntityIdx: index("user_course_progress_idx").on(
			t.userId,
			t.courseId,
			t.currChapterId,
			t.currUnitId,
		),
	}),
);

export const courseRating = sqliteTable("lesson_rating", {
	id,
	ratingId: integer("rating_id")
		.references(() => rating.id)
		.notNull(),
	courseId: integer("course_id")
		.references(() => course.id)
		.notNull(),
});
