import { object, string } from "yup";

const newLessonSchema = object({
	title: string().required().label("Title"),
	desc: string().required().label("Description"),
	content: string().required().label("Content"),
});

export { newLessonSchema };
