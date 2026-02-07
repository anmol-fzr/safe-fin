import { toast } from "sonner";
import { axiosInstance as ax } from "@/services/api/axios";
import type { IResData, ResourceId } from "@/services/api/types";
import type { IResGetCourse } from "./types/one-course";
import type { IResGetUnit } from "./types/one-unit";

const { get, post, patch, delete: del } = ax;

interface IReqCreateCourse {
	title: string;
	shortDesc: string;
	longDesc: string;
	longDescJson: string;
	coverPath: string;
	isPublished: boolean;
}

interface IReqCreateChapter {
	chapters: {
		title: string;
		index: number;
	}[];
	isPublished: boolean;
}

interface IReqUpdateChapter {
	title?: string;
	index?: number;
	isPublished?: boolean;
}

interface IReqCreateUnit {
	title: string;
	shortDesc: string;
	longDesc: {
		content: string;
		contentJson?: any;
	};
	coverPath?: string;
	points: number;
	index: number;
}

export interface IReqUpdateUnit {
	title?: string;
	shortDesc?: string;
	content?: string;
	contentJson?: any;
	coverPath?: string;
	points?: number;
	index?: number;
	isPublished?: boolean;
}

export interface IReqUpdateCourse {
	isPublished?: boolean;
	title?: string;
	shortDesc?: string;
	longDesc?: string;
	longDescJson?: any;
}

export const COURSES = {
	ALL: () => get<unknown, IResGetCourses>(`/courses`),
	CREATE: (course: IReqCreateCourse) =>
		post<unknown, IResCreateCourse>(`/courses`, course),
	ONE: (courseId: ResourceId) =>
		get<unknown, IResGetCourse>(`/courses/${courseId}`),
	UPDATE: (courseId: ResourceId, payload: IReqUpdateCourse) =>
		patch<unknown, IResGetCourse>(`/courses/${courseId}`, payload),

	UPLOAD: async (file: File) => {
		const id = toast.loading("Uploading Image ...");
		const { uploadUrl, publicUrl, fileUrl } = await post<
			unknown,
			{
				uploadUrl: string;
				fileUrl: string;
				publicUrl: string;
			}
		>("/courses/upload-url", {
			fileName: file.name,
			type: "cover",
		});

		const uploadRes = await fetch(uploadUrl, {
			method: "PUT",
			body: file,
			headers: {
				"Content-Type": file.type,
			},
		});

		if (!uploadRes.ok) {
			toast.error("Unable to Upload Image", { id });
			throw new Error("Failed to upload image to storage");
		}
		toast.success("Unable to Upload Image", { id });

		return { publicUrl, fileUrl };
	},

	// DELETE: (lessonId) => ax.delete(`/lessons/${lessonId}`),
	// UPDATE: (lessonId, lesson) => patch(`/lessons/${lessonId}`, lesson),
} as const;

export const CHAPTERS = {
	ONE: (chapterId: ResourceId) =>
		get<unknown, IResOneChapter>(`/courses/chapters/${chapterId}`),

	GET_BY_COURSE: (courseId: ResourceId) =>
		get<unknown, IResData<Chapter[]>>(`/courses/${courseId}/chapters`),
	CREATE: (courseId: ResourceId, payload: IReqCreateChapter) =>
		post<unknown, IResData<Chapter[]>>(
			`/courses/${courseId}/chapters`,
			payload,
		),
	UPDATE: (chapterId: ResourceId, data: IReqUpdateChapter) =>
		patch<unknown, IResData<Chapter>>(`/courses/chapters/${chapterId}`, data),
	DELETE: (chapterId: ResourceId) =>
		del<unknown, IResData<void>>(`/courses/chapters/${chapterId}`),
	REORDER: (payload: {
		courseId: number;
		chapters: {
			index: number;
			id: number;
		}[];
	}) =>
		post<unknown, IResData<{ success: boolean }>>(
			`/courses/chapters/reorder`,
			payload,
		),
} as const;

type IResOneChapter = IResData<{
	id: number;
	courseId: number;
	title: string;
	index: number;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	course: {
		content: {
			title: string;
		};
	};
	units: Array<{
		id: number;
		coverPath: any;
		points: number;
		index: number;
		isPublished: boolean;
		createdAt: string;
		updatedAt: string;
		content: {
			title: string;
			shortDesc: string;
		};
	}>;
}>;

export const UNITS = {
	ONE: (unitId: ResourceId) =>
		get<unknown, IResGetUnit>(`/courses/units/${unitId}`),

	GET_BY_CHAPTER: (chapterId: ResourceId) =>
		get<unknown, IResData<Unit[]>>(`/courses/chapters/${chapterId}/units`),
	CREATE: (
		chapterId: ResourceId,
		payload: { units: IReqCreateUnit[]; isPublished: boolean },
	) =>
		post<unknown, IResData<Unit[]>>(
			`/courses/chapters/${chapterId}/units`,
			payload,
		),
	UPDATE: (unitId: ResourceId, data: IReqUpdateUnit) =>
		patch<unknown, IResData<Unit>>(`/courses/units/${unitId}`, data),
	DELETE: (unitId: ResourceId) =>
		del<unknown, IResData<void>>(`/courses/units/${unitId}`),
	REORDER: (units: Array<{ id: number; index: number }>) =>
		post<unknown, IResData<{ success: boolean }>>(`/courses/units/reorder`, {
			units,
		}),
} as const;

type IResGetCourses = IResData<CourseItem[]>;

type IResCreateCourse = IResData<{
	id: number;
	contentId: number;
	isPublished: boolean;
	ratingSum: number;
	rateCount: number;
	createdAt: string;
	updatedAt: string;
}>;

export interface CourseItem {
	id: number;
	isPublished: boolean;
	ratingSum: number;
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
