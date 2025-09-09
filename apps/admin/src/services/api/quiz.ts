import { axiosInstance } from "./axios";
import type {
	IResData,
	IReqParams,
	ITimestamps,
	IBaseData,
	ResourceId,
} from "./types";

const { get } = axiosInstance;

export const QUIZ: ApiQuiz = {
	GET: (params) => get(`/quiz`, { params }),
	ONE: (quizId) => get(`/quiz/${quizId}`),
} as const;

interface IQuiz extends IBaseData, ITimestamps {
	title: string;
	desc: string;
}

interface IFullQuiz extends IQuiz {
	questions: Question[];
}

type IQuizzes = IQuiz[];
type IQuizzesRes = IResData<IQuizzes>;
type IQuizRes = IResData<IFullQuiz>;

type ApiQuiz = {
	GET: (params: IReqParams) => Promise<IQuizzesRes>;
	ONE: (quizId: ResourceId) => Promise<IQuizRes>;
};

export type { IQuiz, IQuizzes };

interface Question {
	id: number;
	quizId: number;
	question: string;
	answerId: number;
	options: Option[];
	answer: Answer;
}

interface Option {
	id: number;
	question_id: number;
	value: string;
}

interface Answer {
	id: number;
	question_id: number;
	value: string;
}
