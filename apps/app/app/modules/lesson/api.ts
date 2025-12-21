//import { lessonsResSchema } from "@safe-fin/schema/app";
import type { IResData } from "@/services/axios";
import { axiosInstance } from "@/services/axios";
import type { IReqParams, ResourceId } from "@/types";

export const fallbackData = {
	data: [],
	paginate: {
		total: 0,
		nextPage: null,
		hasMore: false,
	},
};

export type ILesson = {
	id: number;
	title: string;
	desc: string;
	createdAt: string;
};

export interface ILessonQuizzes extends ILesson {
	isPublished: boolean;
	content: string;
	updatedAt: string;
	quizzes: Quiz[];
}

interface Quiz {
	id: number;
	lessonId: number;
	quizId: number;
	quiz: { title: string };
}

type IResAllLessons = IResData<ILesson[], true>;
type IResLesson = IResData<ILessonQuizzes>;
type IResLastLesson = IResData<{
	title: string;
	updatedAt: string;
	readMinutes: number;
} | null>;

export const LESSON = {
	ALL: async (params: IReqParams): Promise<IResAllLessons> => {
		const data = await axiosInstance.get("/lessons", {
			params,
		});
		return data;

		// return safeApiParse({
		// 	endpoint: "GET /lessons",
		// 	schema: lessonsResSchema,
		// 	data,
		// 	fallback: fallbackData,
		// });
	},
	ONE: (lessonId: ResourceId) =>
		axiosInstance.get<unknown, IResLesson>(`/lessons/${lessonId}`),
	LAST: () => axiosInstance.get<unknown, IResLastLesson>(`/lessons/last`),
	// Might get replaced by something else in future ( like posthog etc. )
	UPDATE_STATUS: (lessonId: ResourceId) =>
		axiosInstance.post<unknown, null>(`/lessons/${lessonId}/status`, {
			params: { status: "seen" },
		}),
} as const;

const topics = [
	{
		title: "Budget",
	},
	{
		title: "Savings",
	},
	{
		title: "Credit",
	},
	{
		title: "Tax Saving",
	},
	{
		title: "GST",
	},
	{
		title: "Laws",
	},
] as const;

export const TOPIC = {
	ALL: () => topics,
} as const;
