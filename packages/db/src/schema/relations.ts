import { relations } from "drizzle-orm";
import { account, session, user } from "./auth";
import { category } from "./category";
import { chapter, course, courseProgress, courseRating, unit } from "./course";
import { exercise, option, question } from "./exercise";
import { exerciseResult, questionResult } from "./exercise-result";
import { publicUserActivityLog, publicUserProfile } from "./gamification";
import { profile } from "./profile";
import { rating } from "./rating";
import { richContent, richContentItem } from "./rich-content";
import { saved } from "./saved";
import { scam, scamTags } from "./scam";
import { tag } from "./tag";

/**
 * Course Relations
 */
export const courseRelations = relations(course, ({ one, many }) => ({
	chapters: many(chapter),
	content: one(richContent, {
		fields: [course.contentId],
		references: [richContent.id],
	}),
}));

export const chapterRelations = relations(chapter, ({ one, many }) => ({
	course: one(course, {
		fields: [chapter.courseId],
		references: [course.id],
	}),
	units: many(unit),
}));

export const unitRelations = relations(unit, ({ one }) => ({
	chapter: one(chapter, {
		fields: [unit.chapterId],
		references: [chapter.id],
	}),
	content: one(richContent, {
		fields: [unit.contentId],
		references: [richContent.id],
	}),
}));

export const courseProgressRelations = relations(courseProgress, ({ one }) => ({
	user: one(user, {
		fields: [courseProgress.userId],
		references: [user.id],
	}),
	course: one(course, {
		fields: [courseProgress.courseId],
		references: [course.id],
	}),
	currentChapter: one(chapter, {
		fields: [courseProgress.currChapter],
		references: [chapter.id],
	}),
	currentUnit: one(unit, {
		fields: [courseProgress.currUnitId],
		references: [unit.id],
	}),
}));

export const courseRatingRelations = relations(courseRating, ({ one }) => ({
	review: one(rating, {
		fields: [courseRating.ratingId],
		references: [rating.id],
	}),
	lesson: one(course, {
		fields: [courseRating.courseId],
		references: [course.id],
	}),
}));

/**
 * Rich Content Relations
 */
export const richContentRelations = relations(richContent, ({ one }) => ({
	longDesc: one(richContentItem, {
		fields: [richContent.longDescRichId],
		references: [richContentItem.id],
	}),
}));

/**
 * Exercise Relations
 */
export const exerciseRelations = relations(exercise, ({ one, many }) => ({
	unit: one(unit, {
		fields: [exercise.unitId],
		references: [unit.id],
	}),
	questions: many(question),
}));

export const questionRelations = relations(question, ({ one, many }) => ({
	exercise: one(exercise, {
		fields: [question.exerciseId],
		references: [exercise.id],
	}),
	options: many(option),
	answer: one(option, {
		fields: [question.answerId],
		references: [option.id],
	}),
}));

export const optionRelations = relations(option, ({ one }) => ({
	question: one(question, {
		fields: [option.questionId],
		references: [question.id],
	}),
}));

/**
 * Exercise Result Relations
 */
export const exerciseResultRelations = relations(
	exerciseResult,
	({ one, many }) => ({
		user: one(user, {
			fields: [exerciseResult.userId],
			references: [user.id],
		}),
		exercise: one(exercise, {
			fields: [exerciseResult.exerciseId],
			references: [exercise.id],
		}),
		questions: many(questionResult),
	}),
);

export const questionResultRelations = relations(questionResult, ({ one }) => ({
	exerciseResult: one(exerciseResult, {
		fields: [questionResult.exerciseResultId],
		references: [exerciseResult.id],
	}),
	question: one(question, {
		fields: [questionResult.questionId],
		references: [question.id],
	}),
	selectedOption: one(option, {
		fields: [questionResult.selectedOption_id],
		references: [option.id],
	}),
}));

/**
 * Scam Relations
 */
export const scamRelations = relations(scam, ({ one, many }) => ({
	tags: many(scamTags),
	category: one(category, {
		fields: [scam.categoryId],
		references: [category.id],
	}),
}));

export const scamTagsRelations = relations(scamTags, ({ one }) => ({
	scam: one(scam, {
		fields: [scamTags.scamId],
		references: [scam.id],
	}),
	tag: one(tag, {
		fields: [scamTags.tagId],
		references: [tag.id],
	}),
}));

export const tagRelations = relations(tag, ({ many }) => ({
	scams: many(scamTags),
}));

export const categoryRelations = relations(category, ({ many }) => ({
	scams: many(scam),
}));

/**
 * Gamification Relations
 */
export const publicUserProfileRelations = relations(
	publicUserProfile,
	({ one }) => ({
		user: one(user, {
			fields: [publicUserProfile.userId],
			references: [user.id],
		}),
	}),
);

export const publicUserActivityLogRelations = relations(
	publicUserActivityLog,
	({ one }) => ({
		user: one(user, {
			fields: [publicUserActivityLog.userId],
			references: [user.id],
		}),
	}),
);

/**
 * Profile Relations
 */
export const profileRelations = relations(profile, ({ one }) => ({
	user: one(user, {
		fields: [profile.userId],
		references: [user.id],
	}),
}));

/**
 * Rating Relations
 */
export const ratingRelations = relations(rating, ({ one }) => ({
	user: one(user, {
		fields: [rating.userId],
		references: [user.id],
	}),
}));

/**
 * Auth Relations
 */
export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	profiles: many(profile),
	publicProfile: many(publicUserProfile),
	activityLogs: many(publicUserActivityLog),
	ratings: many(rating),
	courseProgress: many(courseProgress),
	exerciseResults: many(exerciseResult),
	likes: many(saved),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

export const savedRelations = relations(saved, ({ one }) => ({
	user: one(user, {
		fields: [saved.userId],
		references: [user.id],
	}),
}));
