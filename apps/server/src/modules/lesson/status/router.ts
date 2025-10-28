import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getDb, lessonRead } from "@/db";
import { createTypedFactory } from "@/factory";
import { authenticate, db } from "@/middleware";

const { createApp } = createTypedFactory();

const lessonStatusParamSchema = z.object({
	status: z.enum(["seen", "red"]).default("seen"),
});

interface UpsertLessonRead {
	lessonId: number;
	userId: string;
	event: "seen" | "red";
}

async function upsertLessonRead(data: UpsertLessonRead) {
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

export const lessonStatusRouter = createApp().post(
	"/:lesson_id/status",
	zValidator("query", lessonStatusParamSchema),
	authenticate,
	(c) => {
		const { status } = c.req.valid("query");
		const { id } = c.get("user");
		const lessonId = Number(c.req.param("lesson_id"));

		c.executionCtx.waitUntil(
			upsertLessonRead({ lessonId, userId: id, event: status }),
		);

		return c.json({ success: true }, 202);
	},
);
