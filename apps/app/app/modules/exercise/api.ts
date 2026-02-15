import type { IResData } from "@/services/axios";
import { axiosInstance } from "@/services/axios";
import { ResourceId } from "@/types";

const { get } = axiosInstance;

export const EXERCISE = {
	ONE: (id: ResourceId) => get<unknown, IResOneExercise>(`/exercise/${id}`),
	RESULT: {
		ONE: (id: ResourceId) =>
			get<unknown, IResOneExerciseResult>(`/exercise/${id}/result`),
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
					question: string;
					answer: Answer;
				};
			}[];
		};
	}[]
>;
