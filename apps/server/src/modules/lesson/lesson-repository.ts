import { lesson, lessonRead } from "@safe-fin/db/schema";
import { and, eq } from "drizzle-orm";
import type { DB } from "@/db";
import { TableQuery } from "@/utils/query";

export class LessonQuery extends TableQuery<typeof lesson> {
	constructor(db: DB) {
		super(db, lesson);
	}

	findPublishedOnly() {
		return this.whereClause(eq(lesson.isPublished, true));
	}

	findDraftOnly() {
		return this.whereClause(eq(lesson.isPublished, false));
	}

	filterByStatus(userId: string, status: "seen" | "red") {
		return this.innerJoin(
			lessonRead,
			and(
				eq(lessonRead.userId, userId),
				eq(lessonRead.lessonId, lesson.id),
				eq(lessonRead.event, status),
			),
		);
	}
}
