import type { IResData } from "@/services/axios";
import { axiosInstance } from "@/services/axios";
import { ResourceId } from "@/types";

const { get, post } = axiosInstance;

export const EXERCISE = {
	ONE: (id: ResourceId) => get<unknown, IResOneExercise>(`/exercise/${id}`),
	RESULT: {
		ONE: (id: ResourceId) =>
			get<unknown, IResOneExerciseResult>(`/exercise/${id}/result`),
		SAVE: (id: ResourceId, payload: IReqSaveExerciseResult) =>
			post<unknown, unknown>(`/exercise/${id}/result`, payload),
	},
};

type IResOneExercise = IResData<Exercise>;

export interface Exercise {
	id: number;
	title: string;
	desc: string;
	points: number;
	chapter: {
		course: {
			content: {
				title: string;
			};
		};
	};
	questions: Questions;
}

type Questions = Question[];

export interface Question {
	id: number;
	question: string;
	reason: string;
	options: Options;
	answer: Answer;
}

type Answer = Option;
type Options = Option[];
interface Option {
	id: number;
	value: string;
}

type IResOneExerciseResult = IResData<
	{
		result: {
			id: number;
			createdAt: string;
			questions: {
				id: number;
				selectedOptionId: number;
				question: {
					id: number;
					options: Option[];
					reason: string;
					question: string;
					answer: Answer;
				};
			}[];
		};
	}[]
>;

export type IReqSaveExerciseResult = {
	results: {
		questionId: number;
		selectedOptionId: number;
		answerId: number;
	}[];
};
