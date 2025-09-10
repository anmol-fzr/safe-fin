import { object, array, string } from "yup";

const optionSchema = object({
	value: string().required().label("Option"),
}).label("Option");

const optionsSchema = array().of(optionSchema).min(1).label("Options");

const questionSchema = object({
	question: string().required().label("Question"),
	options: optionsSchema,
	answer: string().required().label("Answer"),
}).label("Question");

const questionsSchema = array().of(questionSchema).min(1).label("Questions");

const quizSchema = object({
	title: string().required().label("Title"),
	desc: string().required().label("Description"),
	questions: questionsSchema,
});

const newQuizSchema = quizSchema;

export { newQuizSchema };
