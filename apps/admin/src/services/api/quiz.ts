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

type IQuizzes = IQuiz[];
type IQuizzesRes = IResData<IQuizzes>;
type IQuizRes = IResData<IQuiz>;

type ApiQuiz = {
	GET: (params: IReqParams) => Promise<IQuizzesRes>;
	ONE: (quizId: ResourceId) => Promise<IQuizRes>;
};

export type { IQuiz, IQuizzes };
