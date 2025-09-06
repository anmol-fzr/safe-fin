import { axiosInstance } from "@/services/axios";
import { apiClient } from "@/services/axios";
import { IResData } from "@/services/axios";

type ILesson = {
	id: number;
	title: string;
	desc: string;
	createdAt: string;
};

interface ILessonQuizzes extends ILesson {
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

type IResAllLessons = IResData<ILesson[]>;
type IResLesson = IResData<ILessonQuizzes>;

export const LESSON = {
	ALL: () => axiosInstance.get<any, IResAllLessons>("/lessons"),
	ONE: (lessonId: number) =>
		axiosInstance.get<any, IResAllLessons>(`/lessons/${lessonId}`),
} as const;
