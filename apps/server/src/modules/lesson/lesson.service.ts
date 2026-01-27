import { getPaginateRes } from "@/middleware";
import type { BucketConfig } from "@/middleware/s3";
import type { DB } from "@/pkg/db";
import {
	and,
	count,
	course,
	eq,
	richContent,
	richContentItem,
	sql,
	unit,
} from "@/pkg/db";
import type { CourseLevel } from "./lesson.schema";

// ============================================
// Types
// ============================================

interface GetLessonsParams {
	limit: number;
	page: number;
	status?: "seen" | "red";
	user: {
		id: string;
		role: "admin" | "user";
	};
}

interface CreateCourseData {
	title: string;
	shortDesc: string;
	longDesc: string;
	longDescJson?: any;
	coverPath: string;
	isPublished: boolean;
	level: CourseLevel;
}

interface UpdateCourseData {
	title?: string;
	shortDesc?: string;
	longDesc?: string;
	longDescJson?: any;
	coverPath: string;
	isPublished?: boolean;
}

export class LessonService {
	// ========== GET OPERATIONS ==========

	static async getLessons(
		db: DB,
		{ limit, page, user }: GetLessonsParams,
		s3Config: BucketConfig,
	) {
		const offset = (page - 1) * limit;
		const { id: userId, role } = user;
		const isAdmin = role === "admin";
		const { ENDPOINT } = s3Config;

		const whereConditions = [];
		if (!isAdmin) {
			whereConditions.push(eq(course.isPublished, true));
		}

		const lessons = await db.query.course.findMany({
			extras: {
				isSaved:
					sql<boolean>` EXISTS ( SELECT 1 FROM saved WHERE saved.entity_type = 'course' AND saved.entity_id = course.id AND saved.user_id = ${userId}) `.as(
						"is_saved",
					),
				coverUrl: sql<string>` CONCAT(${ENDPOINT}, '/', course.cover_path) `.as(
					"cover_url",
				),
			},
			where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
			orderBy: (course, { desc }) => [desc(course.createdAt)],
			limit,
			offset,
			columns: {
				id: true,
				isPublished: isAdmin,
				level: true,
				avgRating: true,
				rateCount: true,
				createdAt: isAdmin,
				updatedAt: true,
			},
			with: {
				content: {
					columns: {
						title: true,
						shortDesc: true,
					},
					with: {
						longDesc: {
							columns: {
								content: true,
								contentJson: isAdmin,
							},
						},
					},
				},
				// chapters: {
				// 	with: {
				// 		units: true,
				// 	},
				// },
			},
		});

		const countQuery = db.select({ count: count() }).from(course);
		if (whereConditions.length > 0) {
			countQuery.where(and(...whereConditions));
		}
		const countRes = await countQuery;
		const total = countRes[0].count;

		return {
			data: lessons,
			paginate: getPaginateRes({ total, offset, limit }),
		};
	}

	static async getRecentInteracted(db: DB, userId: string) {
		const recentProgress = await db.query.courseProgress.findFirst({
			where: (progress, { eq }) => eq(progress.userId, userId),
			orderBy: (progress, { desc }) => [desc(progress.updatedAt)],
			with: {
				course: {
					with: {
						content: {
							with: {
								longDesc: {
									columns: {
										content: true,
									},
								},
							},
						},
					},
				},
			},
		});

		if (!recentProgress) {
			return null;
		}

		const courseData = recentProgress.course as any;
		return {
			title: courseData.content.title,
			content: courseData.content.longDesc.content,
			updatedAt: recentProgress.updatedAt,
		};
	}

	static async getById(
		db: DB,
		courseId: number,
		includeUnpublished = false,
		userId: string,
		s3: BucketConfig,
	) {
		const { ENDPOINT } = s3;

		const foundCourse = await db.query.course.findFirst({
			extras: {
				coverUrl: sql<string>`CONCAT(${ENDPOINT}, '/', course.cover_path)`.as(
					"cover_url",
				),
				isCompleted:
					sql<boolean>`EXISTS ( SELECT 1 FROM course_progress WHERE course_progress.user_id = ${userId} AND course_progress.course_id = ${courseId} AND course_progress.is_completed = true )`.as(
						"is_completed",
					),
				points:
					sql<number>`COALESCE( ( SELECT SUM(unit.points) FROM chapter JOIN unit ON unit.chapter_id = chapter.id WHERE chapter.course_id = course.id), 0)`.as(
						"points",
					),
			},
			where: (c, { eq, and }) => {
				const conditions = [eq(c.id, courseId)];
				if (!includeUnpublished) {
					conditions.push(eq(c.isPublished, true));
				}
				return and(...conditions);
			},
			columns: {
				id: true,
				isPublished: true,
				avgRating: true,
				rateCount: true,
				createdAt: true,
				updatedAt: true,
			},
			with: {
				content: {
					columns: {
						id: false,
						longDescRichId: false,
					},
					with: {
						longDesc: {
							columns: {
								content: true,
								contentJson: true,
							},
						},
					},
				},
				chapters: {
					columns: {
						id: true,
						title: true,
						index: true,
						isPublished: true,
						createdAt: true,
						updatedAt: true,
					},
					orderBy: (chapter, { asc }) => [asc(chapter.index)],
					with: {
						units: {
							extras: userId
								? {
										isCompleted:
											sql<boolean>` EXISTS ( SELECT 1 FROM course_progress WHERE course_progress.user_id = ${userId} AND course_progress.course_id = ${courseId} AND course_progress.curr_unit_id = ${unit.id}) `.as(
												"is_completed",
											),
									}
								: undefined,
							columns: {
								chapterId: false,
							},
							with: {
								content: {
									columns: {
										longDescRichId: false,
									},
									with: {
										longDesc: {
											columns: {
												content: true,
											},
										},
									},
								},
							},
							orderBy: (unit, { asc }) => [asc(unit.index)],
						},
					},
				},
			},
		});

		return foundCourse;
	}

	// ========== CREATE OPERATIONS ==========

	static async create(db: DB, data: CreateCourseData) {
		const [insertedRichContentItem] = await db
			.insert(richContentItem)
			.values({
				content: data.longDesc,
				contentJson: data.longDescJson || {},
			})
			.returning();

		const [insertedRichContent] = await db
			.insert(richContent)
			.values({
				title: data.title,
				shortDesc: data.shortDesc,
				longDescRichId: insertedRichContentItem.id,
			})
			.returning();

		const [insertedCourse] = await db
			.insert(course)
			.values({
				contentId: insertedRichContent.id,
				level: data.level,
				isPublished: data.isPublished,
				coverPath: data.coverPath,
			})
			.returning();

		return insertedCourse;
	}

	// ========== UPDATE OPERATIONS ==========

	static async updateById(db: DB, courseId: number, data: UpdateCourseData) {
		// If updating content fields, we need to update richContent and richContentItem
		if (data.title || data.shortDesc || data.longDesc || data.longDescJson) {
			// Get the course with its content
			const existingCourse = await db.query.course.findFirst({
				where: (c, { eq }) => eq(c.id, courseId),
				with: {
					content: {
						with: {
							longDesc: true,
						},
					},
				},
			});

			if (!existingCourse) {
				throw new Error("Course not found");
			}

			// Update richContentItem if long description changed
			if (data.longDesc || data.longDescJson) {
				await db
					.update(richContentItem)
					.set({
						...(data.longDesc && { content: data.longDesc }),
						...(data.longDescJson && { contentJson: data.longDescJson }),
					})
					.where(eq(richContentItem.id, existingCourse.content.longDescRichId));
			}

			// Update richContent if title or short description changed
			if (data.title || data.shortDesc) {
				await db
					.update(richContent)
					.set({
						...(data.title && { title: data.title }),
						...(data.shortDesc && { shortDesc: data.shortDesc }),
					})
					.where(eq(richContent.id, existingCourse.contentId));
			}
		}

		const payload: any = {};

		if (data.isPublished !== undefined) {
			payload.isPublished = data.isPublished;
		}

		if (data.coverPath !== undefined) {
			payload.coverPath = data.coverPath;
		}

		if (Object.keys(payload).length > 0) {
			await db.update(course).set(payload).where(eq(course.id, courseId));
		}

		return { success: true };
	}

	static async publishCourse(db: DB, courseId: number, isPublished: boolean) {
		await db.update(course).set({ isPublished }).where(eq(course.id, courseId));

		return { success: true, isPublished };
	}

	// ========== DELETE OPERATIONS ==========

	static async delete(db: DB, courseId: number) {
		// Note: Cascade deletes should be handled by DB constraints
		// This will delete the course and related chapters/units
		return db.delete(course).where(eq(course.id, courseId));
	}
}
