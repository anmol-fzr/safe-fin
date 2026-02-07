import type { DB } from "@/pkg/db";
import { chapter, eq } from "@/pkg/db";

interface CreateChapterData {
	title: string;
	index: number;
}

interface UpdateChapterData {
	title?: string;
	index?: number;
	isPublished?: boolean;
}

export class ChapterService {
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
				course: {
					columns: {},
					with: {
						content: {
							columns: {
								title: true,
							},
						},
					},
				},
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

	static async create(
		db: DB,
		data: {
			courseId: number;
			chapters: CreateChapterData[];
			isPublished: boolean;
		},
	) {
		const chaptersData = data.chapters.map((chapter) => {
			return {
				...chapter,
				courseId: data.courseId,
				isPublished: data.isPublished,
			};
		});

		const insertedChapters = await db
			.insert(chapter)
			.values(chaptersData)
			.returning();

		return insertedChapters;
	}

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
		for (const ch of chapters) {
			await db
				.update(chapter)
				.set({ index: ch.index })
				.where(eq(chapter.id, ch.id));
		}

		return { success: true };
	}

	static async delete(db: DB, chapterId: number) {
		return db.delete(chapter).where(eq(chapter.id, chapterId));
	}
}
