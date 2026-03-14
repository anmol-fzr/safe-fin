import { createTypedFactory } from "@/factory";
import {
	createChapter,
	deleteChapter,
	getChapterById,
	getCourseChapters,
	reorderChapters,
	updateChapter,
} from "./chapter.controller";

const { createApp } = createTypedFactory();

const chapterRouter = createApp()
	.get("/:courseId/chapters", ...getCourseChapters)
	.post("/:courseId/chapters", ...createChapter)
	.post("/chapters/reorder", ...reorderChapters)
	.get("/chapters/:id", ...getChapterById)
	.patch("/chapters/:id", ...updateChapter)
	.delete("/chapters/:id", ...deleteChapter);

export { chapterRouter };
