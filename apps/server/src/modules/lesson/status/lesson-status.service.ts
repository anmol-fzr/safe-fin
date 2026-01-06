import { lessonRead } from "@safe-fin/db/schema";
import { getDb } from "@/pkg/db";

interface UpsertLessonRead {
	lessonId: number;
	userId: string;
	event: "seen" | "red";
}

export async function upsertLessonRead(data: UpsertLessonRead) {
	const db = getDb();

	try {
		await db
			.insert(lessonRead)
			.values(data)
			.onConflictDoUpdate({
				target: [lessonRead.userId, lessonRead.lessonId],
				set: {
					event: data.event,
				},
			})
			.returning();
		console.log("Updated Status");
	} catch (error) {
		console.error(error);
	}
}
