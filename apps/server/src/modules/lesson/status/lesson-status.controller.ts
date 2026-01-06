import { zValidator } from "@hono/zod-validator";
import { createTypedFactory } from "@/factory";
import { authenticate, db } from "@/middleware";
import { itemIdSchema } from "@/schema/params";
import { lessonStatusQuerySchema } from "./lesson-status.schema";
import { upsertLessonRead } from "./lesson-status.service";

const { createHandlers } = createTypedFactory();

export const updateLessonStatus = createHandlers(
	zValidator("query", lessonStatusQuerySchema),
	zValidator("param", itemIdSchema),
	authenticate,
	(c) => {
		const { status } = c.req.valid("query");
		const { id: lessonId } = c.req.valid("param");
		const { id: userId } = c.get("user");

		c.executionCtx.waitUntil(
			upsertLessonRead({ lessonId, userId, event: status }),
		);

		return c.json({ success: true }, 202);
	},
);
