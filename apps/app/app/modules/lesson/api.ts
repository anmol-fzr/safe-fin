import type { IResData } from "@/services/axios";
import { axiosInstance } from "@/services/axios";
import type { IReqParams, ResourceId } from "@/types";
import type { IResGetCourse } from "./api-types/course_one";

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

const { get, post } = axiosInstance;

interface IReqSaveCourseProgress {
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

export const TEMP_LESSONS = {
	ALL: () => {
		return {
			data: [
				{
					id: "ui-components-1",
					title: "UI Components I",
					author: "Colin Michael Pace",
					description:
						"Learn to create user-friendly interfaces using core UI components, building a solid...",
					level: "Intermediate",
					duration: "7h",
					rating: 4.8,
					ratingCount: 8900,
					isBookmarked: false,
					iconType: "building-blocks",
				},
				{
					id: "typography",
					title: "Typography",
					author: "Cameron Chapman",
					description:
						"Learn typography fundamentals, from typeface and font selection to layout and...",
					level: "Intermediate",
					duration: "4h",
					rating: 4.7,
					ratingCount: 3600,
					isBookmarked: false,
					iconType: "text",
				},
				{
					id: "mobile-design",
					title: "Mobile Design",
					author: "Gene Kamenez",
					description:
						"Learn mobile UI/UX patterns, workflows, and platform-specific strategies to create...",
					level: "Intermediate",
					duration: "6h",
					rating: 4.7,
					ratingCount: 4000,
					isBookmarked: false,
					iconType: "mobile",
				},
				{
					id: "common-design-patterns",
					title: "Common Design Patterns",
					author: "Gene Kamenez",
					description:
						"Learn design patterns most valued in product development to create intuitive, visually...",
					level: "Intermediate",
					duration: "5h",
					rating: 4.8,
					ratingCount: 6900,
					isBookmarked: false,
					iconType: "patterns",
				},
				{
					id: "leadership-mastery",
					title: "Leadership Mastery",
					author: "Colin Michael Pace",
					description:
						"Learn essential leadership principles to guide cross-functional teams, shape vision, and...",
					level: "Advanced",
					duration: "3h",
					rating: 4.7,
					ratingCount: 1100,
					isBookmarked: false,
					iconType: "leadership",
				},
				{
					id: "product-analytics",
					title: "Product Analytics",
					author: "Colin Michael Pace",
					description:
						"Learn how to use product analytics to make data-driven decisions and improve user...",
					level: "Advanced",
					duration: "4h",
					rating: 4.6,
					ratingCount: 319,
					isBookmarked: false,
					iconType: "analytics",
				},
				{
					id: "ux-research",
					title: "UX Research",
					author: "Alesya Dzenga",
					description:
						"Learn to plan, conduct, analyze, and present impactful UX research by applying modern...",
					level: "Intermediate",
					duration: "5h",
					rating: 4.7,
					ratingCount: 2800,
					isBookmarked: false,
					iconType: "research",
				},
				{
					id: "ux-writing",
					title: "UX Writing",
					author: "Alesya Dzenga",
					description:
						"Learn to write microcopy that communicates clearly and concisely to improve user...",
					level: "Beginner",
					duration: "3h",
					rating: 4.8,
					ratingCount: 4200,
					isBookmarked: false,
					iconType: "writing",
				},
				{
					id: "ux-design-foundations",
					title: "UX Design Foundations",
					author: "Gene Kamenez",
					description:
						"Learn the essentials of UX design to build a strong foundation in core principles. Gain...",
					level: "Beginner",
					duration: "4h",
					rating: 4.9,
					ratingCount: 5100,
					isBookmarked: false,
					isPopular: true,
					iconType: "foundations",
				},
			] as const,
		} as const;
	},
} as const;

type IResGetCourses = IResData<CourseItem[], true>;

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
	coverPath: any;
	contentId: number;
	chapterId: number;
	exerciseId: any;
	points: number;
	index: number;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
}
