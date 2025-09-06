import { axiosInstance } from "./axios";
import type {
	IResData,
	IPaginatedReqParams,
	ResourceId,
	IReqParams,
} from "./types";

const { get } = axiosInstance;

export const QUIZ = {
	GET: (params: IReqParams) => get(`/quiz`, { params }),
	// ONE: (lessonId) => get(`/lessons/${lessonId}`),
	// CREATE: (lesson) => post(`/lessons`, lesson),
} as const;

interface IQuiz {
	id: number;
	title: string;
	desc: string;
}

type IQuizzes = IQuiz[];

export type { IQuiz, IQuizzes };
