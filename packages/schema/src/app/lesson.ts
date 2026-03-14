import { z } from "zod";
import { paginateSchema } from "./utils";

const lesson = z.object({
	id: z.number(),
	title: z.string(),
	desc: z.string(),
	//isPublished: z.boolean(),
	content: z.string(),
	//contentJson: z.string(),
	//createdAt: z.string(),
	//updatedAt: z.string(),
});

const lessons = z.array(lesson);

const lessonsResSchema = z.object({
	data: lessons,
	paginate: paginateSchema,
});

export { lessonsResSchema };
