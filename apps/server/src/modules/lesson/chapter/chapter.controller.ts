import { zValidator } from "@hono/zod-validator";
import type { DB } from "@safe-fin/db";
import { z } from "zod";
import { createTypedFactory } from "@/factory";
import { authenticate, db, userRole } from "@/middleware";
import { dbIdSchema } from "@/schema";
import { courseIdParamSchema } from "../lesson.schema";
import {
	createChapterSchema,
	reorderChaptersSchema,
	updateChapterSchema,
} from "./chapter.schema";
import { ChapterService } from "./chapter.service";

const { createHandlers } = createTypedFactory();

export const createChapter = createHandlers(
	authenticate,
	db,
	userRole("admin"),
	zValidator("json", createChapterSchema),
	zValidator("param", courseIdParamSchema),
	async (c) => {
		const db = c.get("db");
		const { courseId } = c.req.valid("param");

		const { chapters, isPublished } = c.req.valid("json");

		const newChapters = await ChapterService.create(db, {
			courseId,
			chapters,
			isPublished,
		});

		return c.json({ data: newChapters }, 201);
	},
);

export const getCourseChapters = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ courseId: dbIdSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");
		const { courseId } = c.req.valid("param");

		const includeUnpublished = user.role === "admin";
		const chapters = await ChapterService.getChaptersByCourseId(
			db,
			courseId,
			includeUnpublished,
		);

		return c.json({ data: chapters });
	},
);

export const reorderChapters = createHandlers(
	authenticate,
	db,
	zValidator("json", reorderChaptersSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can reorder chapters
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { chapters } = c.req.valid("json");
		const result = await ChapterService.reorderChapters(db, chapters);

		return c.json({ data: result });
	},
);

export const deleteChapter = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can delete chapters
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { id } = c.req.valid("param");
		await ChapterService.delete(db, id);

		return c.json({ success: true });
	},
);

export const updateChapter = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	zValidator("json", updateChapterSchema),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");

		// Only admins can update chapters
		if (user.role !== "admin") {
			return c.json({ error: "Unauthorized" }, 403);
		}

		const { id } = c.req.valid("param");
		const data = c.req.valid("json");

		const updatedChapter = await ChapterService.updateById(db, id, data);

		if (!updatedChapter) {
			return c.json({ error: "Chapter not found" }, 404);
		}

		return c.json({ data: updatedChapter });
	},
);

export const getChapterById = createHandlers(
	authenticate,
	db,
	zValidator("param", z.object({ id: dbIdSchema })),
	async (c) => {
		const user = c.get("user");
		const db = c.get("db");
		const { id } = c.req.valid("param");

		const includeUnpublished = user.role === "admin";
		const chapter = await ChapterService.getById(db, id, includeUnpublished);

		if (!chapter) {
			return c.json({ error: "Chapter not found" }, 404);
		}

		return c.json({ data: chapter });
	},
);
