import { axiosInstance } from "@/services/api/axios";
import type { IResData, ResourceId } from "@/services/api/types";

const { get, post } = axiosInstance;

interface IReqCreateExercise {
	title: string;
	desc: string;
	isPublished: boolean;
	chapterId: number;
}

export const EXERCISE = {
	ALL: () => get<unknown, IResAllExercise>("/exercise"),
	CREATE: (data: IReqCreateExercise) =>
		post<unknown, IResCreateExercise>("/exercise", data),
	ONE: (exerciseId: ResourceId) =>
		get<unknown, IResOneExercise>(`/exercise/${exerciseId}`),
} as const;

interface IReqCreateQuestion {
	question: string;
	reason: string;
	isPublished: boolean;
	exerciseId: number;
}

export const QUESTION = {
	//ALL: () => get<unknown, IResAllExercise>("/exercise"),
	CREATE: (data: IReqCreateQuestion) =>
		post<unknown, IResCreateQuestion>("/exercise/question", data),
	// ONE: (exerciseId: ResourceId) =>
	// 	post<unknown, IResOneExercise>(`/exercise/${exerciseId}`),
} as const;

type IResCreateQuestion = IResData<{
	id: number;
	exerciseId: number;
	question: string;
	reason: string;
	answerId: any;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
}>;

interface IReqCreateOption {
	questionId: ResourceId;
	value: string;
}

export const OPTION = {
	//ALL: () => get<unknown, IResAllExercise>("/exercise"),
	CREATE: (data: IReqCreateOption) =>
		post<unknown, IResCreateOption>("/exercise/option", data),
	// ONE: (exerciseId: ResourceId) =>
	// 	post<unknown, IResOneExercise>(`/exercise/${exerciseId}`),
} as const;

type IResCreateOption = IResData<{
	id: number;
	questionId: number;
	value: string;
	index: number;
	createdAt: string;
	updatedAt: string;
}>;

type IResAllExercise = IResData<IExercise[], true>;
type IResOneExercise = IResData<
	Omit<IExercise, "chapter"> & {
		questions: Array<{
			id: number;
			exerciseId: number;
			question: string;
			reason: string;
			answerId: any;
			isPublished: boolean;
			createdAt: string;
			updatedAt: string;
			options: Array<{
				id: number;
				questionId: number;
				value: string;
				createdAt: string;
				updatedAt: string;
			}>;
		}>;
	},
	false
>;
type IResCreateExercise = IResData<Omit<IExercise, "chapter">, false>;

export interface IExercise {
	id: number;
	coverPath: any;
	title: string;
	desc: string;
	chapterId: number;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	chapter: {
		title: string;
	};
}
