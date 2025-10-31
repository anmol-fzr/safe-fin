import { lesson } from "@safe-fin/db/schema";
import { createSchemas } from "../utils";

const [selectLessonSchema, insertLessonSchema, updateLessonSchema] =
	createSchemas(lesson);

export { selectLessonSchema, insertLessonSchema, updateLessonSchema };
