import { axiosInstance as ax } from "./axios";
import type {
	IResData,
	IPaginatedReqParams,
	ITimestamps,
	ResourceId,
	IReqParams,
	IBaseData,
} from "./types";

const { get, post, patch } = ax;

export const LESSON: ApiLesson = {
	GET: (params) => get(`/lessons`, { params }),
	ONE: (lessonId) => get(`/lessons/${lessonId}`),
	CREATE: (lesson) => post(`/lessons`, lesson),
	DELETE: (lessonId) => ax.delete(`/lessons/${lessonId}`),
	UPDATE: (lessonId, lesson) => patch(`/lessons/${lessonId}`, lesson),
} as const;

type ILessonsRes = IResData<ILesson[]>;
type ILessonRes = IResData<ILesson>;

export type ICreateLessonReq = Pick<
	ILesson,
	"title" | "desc" | "content" | "contentJson" | "isPublished"
>;

type ApiLesson = {
	GET: (params: IPaginatedReqParams & IReqParams) => Promise<ILessonsRes>;
	ONE: (id: ResourceId) => Promise<ILessonRes>;
	CREATE: (lesson: ICreateLessonReq) => Promise<ILessonRes>;
	DELETE: (lesson: ResourceId) => Promise<ILessonRes>;
	UPDATE: (id: ResourceId, lesson: ICreateLessonReq) => Promise<ILessonRes>;
};

interface ILesson extends IBaseData, ITimestamps {
	title: string;
	desc: string;
	isPublished: boolean;
	content: string;
	contentJson: Object;
}

type ILessons = ILesson[];

export type { ILesson, ILessons };
