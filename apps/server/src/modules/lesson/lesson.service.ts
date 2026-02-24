import type { User } from "@safe-fin/auth";
import { getPaginateRes, getS3Config } from "@/middleware";
import type { BucketConfig } from "@/middleware/s3";
import type { DB } from "@/pkg/db";
import {
	and,
	chapter,
	count,
	course,
	courseProgress,
	eq,
	exercise,
	exerciseAttempt,
	exists,
	getDb,
	richContent,
	richContentItem,
	sql,
	unit,
} from "@/pkg/db";
import type { ResourceId } from "../_utils/service";
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

const db = getDb();

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

		const lessonsQuery = db.query.course.findMany({
			extras: {
				rating:
					sql`CAST(${course.ratingSum} AS REAL) / ${course.rateCount} `.as(
						"rating",
					),
				points:
					sql<number>`COALESCE( ( SELECT SUM(unit.points) FROM chapter JOIN unit ON unit.chapter_id = chapter.id WHERE chapter.course_id = course.id), 0)`.as(
						"points",
					),

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
				ratingSum: false,
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

		const [lessons, countRes] = await Promise.all([lessonsQuery, countQuery]);
		const total = countRes[0].count;

		// const nextUnit = await db.query.unit.findFirst({
		// 	where: (u, { eq, and, gt }) => {
		// 		const conditions = [
		// 			eq(u.chapterId, foundUnit.chapterId),
		// 			gt(u.index, foundUnit.index),
		// 		];
		// 		if (!isAdmin) {
		// 			conditions.push(eq(u.isPublished, true));
		// 		}
		// 		return and(...conditions);
		// 	},
		// 	orderBy: (u, { asc }) => [asc(u.index)],
		// 	columns: {
		// 		id: true,
		// 	},
		// });

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

	static async getById(courseId: ResourceId, user: User) {
		const { ENDPOINT } = getS3Config();
		const { id: userId } = user;

		const isAdmin = user.role === "admin";

		const foundCourse = await db.query.course.findFirst({
			extras: {
				coverUrl: sql`CONCAT(${ENDPOINT}, '/', course.cover_path)`.as(
					"cover_url",
				),
				isCompleted: exists(
					db
						.select()
						.from(courseProgress)
						.where(
							and(
								eq(courseProgress.userId, userId),
								eq(courseProgress.courseId, courseId),
								eq(courseProgress.isCompleted, true),
							),
						),
				).as("is_completed"),
				points:
					sql`COALESCE( ( SELECT SUM(unit.points) FROM chapter JOIN unit ON unit.chapter_id = chapter.id WHERE chapter.course_id = course.id), 0)`.as(
						"points",
					),
			},
			where: (c, { eq, and }) => {
				const conditions = [eq(c.id, courseId)];
				if (isAdmin) {
					conditions.push(eq(c.isPublished, true));
				}
				return and(...conditions);
			},
			columns: {
				id: true,
				isPublished: isAdmin,
				ratingSum: true,
				rateCount: true,
				createdAt: isAdmin,
				updatedAt: true,
			},
			with: {
				content: {
					columns: {
						id: false,
						longDescRichId: false,
						createdAt: isAdmin,
						updatedAt: isAdmin,
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
				chapters: {
					extras: userId
						? {
								status: sql<"COMPLETED" | "ONGOING" | "LOCKED">`
        CASE
            -- All units completed
            WHEN NOT EXISTS (
                SELECT 1
                FROM unit u
                WHERE u.chapter_id = ${chapter.id}
                AND NOT EXISTS (
                    SELECT 1
                    FROM course_progress cp
                    WHERE cp.user_id = ${userId}
                    AND cp.curr_unit_id = u.id
                )
            ) THEN 'COMPLETED'

            -- Any unit completed
            WHEN EXISTS (
                SELECT 1
                FROM unit u
                JOIN course_progress cp
                    ON cp.curr_unit_id = u.id
                WHERE cp.user_id = ${userId}
                AND u.chapter_id = ${chapter.id}
            ) THEN 'ONGOING'

            ELSE 'LOCKED'
        END
      `.as("status"),
							}
						: undefined,

					columns: {
						id: true,
						title: true,
						index: isAdmin,
						isPublished: isAdmin,
						createdAt: isAdmin,
						updatedAt: isAdmin,
					},
					orderBy: (chapter, { asc }) => [asc(chapter.index)],
					where: (exercises, { eq }) =>
						isAdmin ? undefined : eq(exercises.isPublished, true),
					with: {
						exercises: {
							extras: {
								status: sql<"COMPLETED" | "LOCKED" | "UNLOCKED">`
            CASE
                -- 1. Check if Completed (Look in exercise_attempt)
                WHEN EXISTS (
                    SELECT 1 FROM exercise_attempt ea
                    WHERE ea.user_id = ${userId}
                    AND ea.exercise_id = ${exercise.id}
                ) THEN 'COMPLETED'

                -- 2. Check if Locked (Is there an unfinished previous exercise in this chapter?)
                WHEN EXISTS (
                    SELECT 1
                    FROM exercise prev_e
                    WHERE prev_e.chapter_id = ${chapter.id} -- Same chapter
                    AND prev_e.is_published = 1             -- Ignore hidden/unpublished exercises
                    AND NOT EXISTS (
                        SELECT 1
                        FROM exercise_attempt ea
                        WHERE ea.user_id = ${userId}
                        AND ea.exercise_id = prev_e.id
                    )
                ) THEN 'LOCKED'

                -- 3. Default to Unlocked
                ELSE 'UNLOCKED'
            END
        `.as("status"),
							},

							columns: {
								chapterId: isAdmin,
								isPublished: isAdmin,
								createdAt: isAdmin,
								updatedAt: isAdmin,
							},

							where: (exercises, { eq }) =>
								isAdmin ? undefined : eq(exercises.isPublished, true),
							orderBy: (exercise, { desc }) => [desc(exercise.createdAt)], // Ensure correct order for index logic
						},

						units: {
							extras: userId
								? {
										status: sql<"COMPLETED" | "LOCKED" | "UNLOCKED">`
            CASE
                -- 1. Check if Completed
                WHEN EXISTS (
                    SELECT 1 FROM course_progress cp
                    WHERE cp.user_id = ${userId}
                    AND cp.curr_unit_id = ${unit.id}
                ) THEN 'COMPLETED'

                -- 2. Check if Locked (Predecessor logic)
                WHEN EXISTS (
                    SELECT 1
                    FROM unit u
                    JOIN chapter c ON c.id = u.chapter_id
                    WHERE c.course_id = ${courseId}
                    AND u."index" < ${unit.index} -- Check strictly previous units
                    AND NOT EXISTS (
                        SELECT 1
                        FROM course_progress cp
                        WHERE cp.user_id = ${userId}
                        AND cp.curr_unit_id = u.id
                    )
                ) THEN 'LOCKED'

                -- 3. Default to Unlocked (Available to start)
                ELSE 'UNLOCKED'
            END
        `.as("status"),
									}
								: undefined,
							columns: {
								id: true,
								chapterId: false,
								index: isAdmin,
								points: true,
								isPublished: isAdmin,
								contentId: isAdmin,
								createdAt: isAdmin,
								updatedAt: isAdmin,
							},
							where: (units, { eq }) =>
								isAdmin ? undefined : eq(units.isPublished, true),
							with: {
								content: {
									columns: {
										longDescRichId: false,
										title: true,
										createdAt: isAdmin,
										updatedAt: isAdmin,
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

// const isCompleted =
// exists(
// db
// .select()
// .from(courseProgress)
// .where(
// and(
// eq(courseProgress.userId, user.id),
// eq(courseProgress.courseId, courseId)
// )
// )
// )
// .as( "is_completed")
