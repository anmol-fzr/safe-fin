import { axiosInstance as ax } from "./axios";
import type {
	IResData,
	IPaginatedReqParams,
	ITimestamps,
	ResourceId,
	IReqParams,
	IBaseData,
} from "./types";

const { get, post } = ax;

export const LESSON: ApiLesson = {
	GET: (params) => get(`/lessons`, { params }),
	ONE: (lessonId) => get(`/lessons/${lessonId}`),
	CREATE: (lesson) => post(`/lessons`, lesson),
	DELETE: (lessonId) => ax.delete(`/lessons/${lessonId}`),
} as const;

type ILessonsRes = IResData<ILesson[]>;
type ILessonRes = IResData<ILesson>;

type ICreateLessonReq = Omit<ILesson, "id" | "createdAt">;

type ApiLesson = {
	GET: (params: IPaginatedReqParams & IReqParams) => Promise<ILessonsRes>;
	ONE: (lessonId: ResourceId) => Promise<ILessonRes>;
	CREATE: (lesson: ICreateLessonReq) => Promise<ILessonRes>;
	DELETE: (lesson: ResourceId) => Promise<ILessonRes>;
};

interface ILesson extends IBaseData, ITimestamps {
	title: string;
	desc: string;
	content: string;
	contentJson: Object;
}

type ILessons = ILesson[];

export type { ILesson, ILessons };
