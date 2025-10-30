import type { z } from "zod";
import {
	selectLessonSchema as baseSelectSchema,
	updateLessonSchema,
} from "../common/lesson";

const lessonInsertSchema = baseSelectSchema.pick({
	title: true,
	desc: true,
	isPublished: true,
	content: true,
	contentJson: true,
});

type LessonInsertSchema = z.infer<typeof lessonInsertSchema>;
type LessonUpdateSchema = z.infer<typeof updateLessonSchema>;

export type { LessonInsertSchema, LessonUpdateSchema };
export { lessonInsertSchema, updateLessonSchema };
