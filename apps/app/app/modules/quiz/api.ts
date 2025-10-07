import { RESULT } from "../../services/api/quiz-result";
import type { IResData } from "../../services/axios";
import { axiosInstance } from "../../services/axios";

export type IResQuizzes = IResData<Quizzes>;
export type IResQuiz = IResData<QuizWQues>;

export type Quizzes = Quiz[];

export interface Quiz {
	id: number;
	title: string;
	desc: string;
	//isPublished: boolean;
	//questions: Question[];
}

type QuizWQues = Quiz & {
	//isPublished: boolean;
	questions: Question[];
};

export interface Question {
	id: number;
	quizId: number;
	question: string;
	answerId: number;
	options: Option[];
	answer: Answer;
}

export interface Option {
	id: number;
	question_id: number;
	value: string;
}

interface Answer {
	id: number;
	question_id: number;
	value: string;
}

export const QUIZ = {
	ALL: () => axiosInstance.get<unknown, IResQuizzes>("/quiz"),
	ONE: (quizId: number) =>
		axiosInstance.get<unknown, IResQuiz>(`/quiz/${quizId}`),
	RESULT,
};
