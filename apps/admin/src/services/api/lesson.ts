import { axiosInstance } from "./axios";
import type {
	IResData,
	IPaginatedReqParams,
	ResourceId,
	IReqParams,
} from "./types";

const { get, post } = axiosInstance;

export const LESSON: ApiLesson = {
	GET: (params) => get(`/lessons`, { params }),
	ONE: (lessonId) => get(`/lessons/${lessonId}`),
	CREATE: (lesson) => post(`/lessons`, lesson),
} as const;

type ILessonsRes = IResData<ILesson[]>;
type ILessonRes = IResData<ILesson>;

type ICreateLessonReq = Omit<ILesson, "id" | "createdAt">;

type ApiLesson = {
	GET: (params: IPaginatedReqParams & IReqParams) => Promise<ILessonsRes>;
	ONE: (lessonId: ResourceId) => Promise<ILessonRes>;
	CREATE: (lesson: ICreateLessonReq) => Promise<ILessonRes>;
};

interface ILesson {
	id: number;
	title: string;
	desc: string;
	createdAt: string;
	updatedAt: string;
	content: string;
	contentJson: Object;
}

type ILessons = ILesson[];

export type { ILesson, ILessons };
