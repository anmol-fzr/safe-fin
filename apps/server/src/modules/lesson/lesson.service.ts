import { getPaginateRes } from "@/middleware";
import type { DB } from "@/pkg/db";
import {
	and,
	chapter,
	count,
	course,
	eq,
	richContent,
	richContentItem,
	sql,
} from "@/pkg/db";

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
}

interface UpdateCourseData {
	title?: string;
	shortDesc?: string;
	longDesc?: string;
	longDescJson?: any;
	isPublished?: boolean;
}

interface CreateChapterData {
	title: string;
	index: number;
}

interface UpdateChapterData {
	title?: string;
	index?: number;
	isPublished?: boolean;
}

// ============================================
// Course Service
// ============================================

export class LessonService {
	// ========== GET OPERATIONS ==========

	static async getLessons(
		db: DB,
		{ limit, page, status, user }: GetLessonsParams,
	) {
		const offset = (page - 1) * limit;
		const { id: userId, role } = user;
		const isAdmin = role === "admin";

		const whereConditions = [];
		if (!isAdmin) {
			whereConditions.push(eq(course.isPublished, true));
		}

		const lessons = await db.query.course.findMany({
			extras: {
				isSaved: sql<boolean>`
      EXISTS (
        SELECT 1
        FROM saved
        WHERE saved.entity_type = 'course'
          AND saved.entity_id = course.id
          AND saved.user_id = ${userId}
      )
    `.as("is_saved"),
			},
			where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
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
			where: (progress, { eq }) => eq(progress.userId, Number(userId)),
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

	static async getById(db: DB, courseId: number, includeUnpublished = false) {
		const foundCourse = await db.query.course.findFirst({
			extras: {
				points: sql<number>`
      COALESCE(
        (
          SELECT SUM(unit.points)
          FROM chapter
          JOIN unit ON unit.chapter_id = chapter.id
          WHERE chapter.course_id = course.id
        ),
        0
      )
    `.as("points"),
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
		// Step 1: Create rich content item (long description)
		const [insertedRichContentItem] = await db
			.insert(richContentItem)
			.values({
				content: data.longDesc,
				contentJson: data.longDescJson || {},
			})
			.returning();

		// Step 2: Create rich content (title + short desc + reference to long desc)
		const [insertedRichContent] = await db
			.insert(richContent)
			.values({
				title: data.title,
				shortDesc: data.shortDesc,
				longDescRichId: insertedRichContentItem.id,
			})
			.returning();

		// Step 3: Create course
		const [insertedCourse] = await db
			.insert(course)
			.values({
				contentId: insertedRichContent.id,
				isPublished: false,
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

		// Update course-level fields (like isPublished)
		if (data.isPublished !== undefined) {
			await db
				.update(course)
				.set({ isPublished: data.isPublished })
				.where(eq(course.id, courseId));
		}

		// Return updated course
		return this.getById(db, courseId, true);
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

// ============================================
// Chapter Service
// ============================================

export class ChapterService {
	// ========== GET OPERATIONS ==========

	static async getChaptersByCourseId(
		db: DB,
		courseId: number,
		includeUnpublished = false,
	) {
		const chapters = await db.query.chapter.findMany({
			where: (ch, { eq, and }) => {
				const conditions = [eq(ch.courseId, courseId)];
				if (!includeUnpublished) {
					conditions.push(eq(ch.isPublished, true));
				}
				return and(...conditions);
			},
			orderBy: (ch, { asc }) => [asc(ch.index)],
			columns: {
				id: true,
				title: true,
				index: true,
				isPublished: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return chapters;
	}

	static async getById(db: DB, chapterId: number, includeUnpublished = false) {
		const foundChapter = await db.query.chapter.findFirst({
			where: (ch, { eq, and }) => {
				const conditions = [eq(ch.id, chapterId)];
				if (!includeUnpublished) {
					conditions.push(eq(ch.isPublished, true));
				}
				return and(...conditions);
			},
			with: {
				units: {
					columns: {
						id: true,
						coverPath: true,
						points: true,
						index: true,
						isPublished: true,
						createdAt: true,
						updatedAt: true,
					},
					with: {
						content: {
							columns: {
								title: true,
								shortDesc: true,
							},
						},
					},
					orderBy: (unit, { asc }) => [asc(unit.index)],
				},
			},
		});

		return foundChapter;
	}

	// ========== CREATE OPERATIONS ==========

	static async create(
		db: DB,
		data: { courseId: number; chapters: CreateChapterData[] },
	) {
		const chaptersData = data.chapters.map((chapter) => {
			return {
				...chapter,
				courseId: data.courseId,
			};
		});

		const insertedChapters = await db
			.insert(chapter)
			.values(chaptersData)
			.returning();

		return insertedChapters;
	}

	// ========== UPDATE OPERATIONS ==========

	static async updateById(db: DB, chapterId: number, data: UpdateChapterData) {
		const [updatedChapter] = await db
			.update(chapter)
			.set(data)
			.where(eq(chapter.id, chapterId))
			.returning();

		return updatedChapter;
	}

	static async reorderChapters(
		db: DB,
		chapters: Array<{ id: number; index: number }>,
	) {
		// Update each chapter's index
		for (const ch of chapters) {
			await db
				.update(chapter)
				.set({ index: ch.index })
				.where(eq(chapter.id, ch.id));
		}

		return { success: true };
	}

	// ========== DELETE OPERATIONS ==========

	static async delete(db: DB, chapterId: number) {
		return db.delete(chapter).where(eq(chapter.id, chapterId));
	}
}
