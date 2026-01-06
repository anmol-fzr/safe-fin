import {
    and,
    count,
    desc,
    eq,
    lesson,
    lessonQuiz,
    lessonRead,
} from "@/pkg/db";
import { getPaginateRes } from "@/middleware";

import type {
    LessonInsertSchema,
    LessonUpdateSchema,
} from "@safe-fin/schema/server";

import type { DB } from "@/pkg/db";

interface GetLessonsParams {
    limit: number;
    page: number;
    status?: "seen" | "red";
    user: {
        id: string;
        role: "admin" | "user";
    };
}

export class LessonService {
    static async getLessons(
        db: DB,
        { limit, page, status, user }: GetLessonsParams,
    ) {
        const offset = (page - 1) * limit;
        const { id: userId, role } = user;

        const isAdmin = role === "admin";

        const whereConditions = [];

        if (!isAdmin) {
            whereConditions.push(eq(lesson.isPublished, true));
        }

        let baseQuery;

        if (!isAdmin) {
            baseQuery = db
                .select({
                    id: lesson.id,
                    title: lesson.title,
                    desc: lesson.desc,
                    content: lesson.content,
                })
                .from(lesson);
        } else {
            baseQuery = db.select().from(lesson);
        }

        if (status) {
            baseQuery.innerJoin(
                lessonRead,
                and(
                    eq(lessonRead.userId, userId),
                    eq(lessonRead.lessonId, lesson.id),
                    eq(lessonRead.event, status),
                ),
            );
        }

        if (whereConditions.length > 0) {
            baseQuery.where(and(...whereConditions));
        }

        const countQuery = db.select({ count: count() }).from(lesson);

        if (status) {
            countQuery.innerJoin(
                lessonRead,
                and(
                    eq(lessonRead.userId, userId),
                    eq(lessonRead.lessonId, lesson.id),
                    eq(lessonRead.event, status),
                ),
            );
        }

        if (whereConditions.length > 0) {
            countQuery.where(and(...whereConditions));
        }

        const query = baseQuery.limit(limit).offset(offset);

        const [lessons, countRes] = await Promise.all([query, countQuery]);

        const total = countRes[0].count;

        return {
            data: lessons,
            paginate: getPaginateRes({ total, offset, limit }),
        };
    }

    static async getById(db: DB, lessonId: number) {
        const foundLesson = await db.query.lesson.findFirst({
            where: (lesson, { eq }) => eq(lesson.id, lessonId),
            columns: {
                createdAt: false,
            },
            with: {
                quizzes: {
                    with: {
                        quiz: {
                            columns: {
                                id: false,
                                desc: false,
                                createdAt: false,
                                updatedAt: false,
                                isPublished: false,
                            },
                        },
                    },
                },
            },
        });

        return foundLesson;
    }

    static async create(db: DB, data: LessonInsertSchema) {
        const [inserted] = await db.insert(lesson).values(data).returning();

        return inserted;
    }

    static async updateById(db: DB, lessonId: number, data: LessonUpdateSchema) {
        const updatedLesson = await db
            .update(lesson)
            .set(data)
            .where(eq(lesson.id, lessonId));

        return updatedLesson;
    }

    static async delete(db: DB, lessonId: number) {
        return db.delete(lesson).where(eq(lesson.id, lessonId));
    }

    static async linkWithQuiz(db: DB, lessonId: number, quizId: number) {
        await db.insert(lessonQuiz).values({ lessonId, quizId });
    }

    static async getRecentInteracted(db: DB, userId: string) {
        const lastSeen = await db.query.lessonRead.findFirst({
            where: (lessonReads, { eq, and }) =>
                and(eq(lessonReads.userId, userId), eq(lessonReads.event, "seen")),
            orderBy: desc(lessonRead.createdAt),
            columns: {
                lessonId: true,
            },
        });

        if (!lastSeen) {
            return null;
        }

        const lastLesson = await db.query.lesson.findFirst({
            where: (lessons, { eq, and }) =>
                and(eq(lessons.id, lastSeen.lessonId), eq(lessons.isPublished, true)),
            columns: {
                title: true,
                updatedAt: true,
                content: true,
            },
        });

        return lastLesson;
    }
}
