import { mixed, object, string } from "yup";

const newLessonSchema = object({
	title: string().required().label("Title"),
	desc: string().required().label("Description"),
	content: mixed().required().label("Content"),
});

export { newLessonSchema };
