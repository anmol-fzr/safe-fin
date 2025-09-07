import { axiosInstance } from "./axios";
import type { IResData, IReqParams, ITimestamps, IBaseData } from "./types";

const { get } = axiosInstance;

export const QUIZ: ApiQuiz = {
	GET: (params) => get(`/quiz`, { params }),
} as const;

interface IQuiz extends IBaseData, ITimestamps {
	title: string;
	desc: string;
}

type IQuizzes = IQuiz[];
type IQuizzesRes = IResData<IQuizzes>;

type ApiQuiz = {
	GET: (params: IReqParams) => Promise<IQuizzesRes>;
};

export type { IQuiz, IQuizzes };
