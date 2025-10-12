import type { IResData } from "@/services/axios";
import { axiosInstance } from "@/services/axios";
import type { IReqParams, ResourceId } from "@/types";

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

export const LESSON = {
	ALL: (params: IReqParams) =>
		axiosInstance.get<unknown, IResAllLessons>("/lessons", { params }),
	ONE: (lessonId: ResourceId) =>
		axiosInstance.get<unknown, IResLesson>(`/lessons/${lessonId}`),
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
