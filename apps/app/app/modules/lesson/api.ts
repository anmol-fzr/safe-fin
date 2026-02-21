import type { IResData } from "@/services/axios";
import { axiosInstance } from "@/services/axios";
import type { IReqParams, ResourceId } from "@/types";
import type { IResGetCourse } from "./api-types/course_one";

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

const { get, post } = axiosInstance;

export interface IReqSaveCourseProgress {
	courseId: ResourceId;
	chapterId: ResourceId;
	unitId: ResourceId;
}

export const COURSES = {
	FOR_YOU: () => get<unknown, IResGetCourses>(`/courses/for-you`),
	ALL: (params: IReqParams) =>
		get<unknown, IResGetCourses>(`/courses`, { params }),
	ONE: (courseId: ResourceId) =>
		get<unknown, IResGetCourse>(`/courses/${courseId}`),

	PROGRESS: {
		SAVE: (payload: IReqSaveCourseProgress) =>
			post<unknown, IResSaveCourseProgress>(`/courses/progress`, payload),
		LAST: () => get<unknown, IResGetLastCourse>(`/courses/progress/last`),
	},

	SAVED: {
		ALL: () =>
			get<unknown, IResGetSavedCourse>(`/saved`, {
				params: { type: "course" },
			}),
		TOGGLE: (courseId: ResourceId) =>
			post<unknown, IResToggleSavedCourse>(`/courses/${courseId}/toggle-like`),
	},

	UNITS: {
		ONE: (unitId: ResourceId) =>
			get<unknown, IResGetUnit>(`/courses/units/${unitId}`),
	},

	RATE: (courseId: ResourceId, rating: number) =>
		post(`/courses/${courseId}/rate`, { rating }),
};

type IResGetLastCourse = IResData<{
	course: {
		id: number;
		content: {
			title: string;
		};
	};
	progress: {
		percentage: number;
	};
} | null>;

type IResGetUnit = IResData<{
	id: number;
	coverPath: null;
	contentId: number;
	chapterId: number;
	exerciseId: null | number;
	points: number;
	index: number;
	isPublished: boolean;
	isCompleted: 0 | 1;
	createdAt: string;
	updatedAt: string;
	content: {
		id: number;
		title: string;
		shortDesc: string;
		longDescRichId: number;
		createdAt: string;
		updatedAt: string;
		longDesc: LongDesc;
	};
	chapter: {
		course: {
			id: number;
			rateCount: number;
			rating: {
				review: null | {
					id: number;
					rating: number;
				};
			};
			content: {
				title: string;
			};
		};
	};
	nextUnitId: number | null;
}>;

type IResGetSavedCourse = IResData<
	{
		entityType: string;
		entityId: number;
		userId: string;
		createdAt: string;
		updatedAt: string;
	}[],
	true
>;
type IResSaveCourseProgress = IResSuccess;
type IResToggleSavedCourse = IResSuccess;

type IResSuccess = IResData<{ success: boolean }>;

export type IResGetCourses = IResData<CourseItem[], true>;

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CourseItem {
	id: number;
	isPublished: boolean;
	isSaved: 0 | 1;
	level: CourseLevel;
	coverUrl: string;
	points: number;
	rating: number;
	rateCount: number;
	createdAt: string;
	updatedAt: string;
	content: Content;
	chapters: Chapter[];
}

interface Content {
	title: string;
	shortDesc: string;
	longDesc: LongDesc;
}

interface LongDesc {
	content: string;
	contentJson: string;
}

interface Chapter {
	id: number;
	courseId: number;
	title: string;
	index: number;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	units: Unit[];
}

interface Unit {
	id: number;
	coverPath: null;
	contentId: number;
	chapterId: number;
	exerciseId: null | number;
	points: number;
	index: number;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
}
