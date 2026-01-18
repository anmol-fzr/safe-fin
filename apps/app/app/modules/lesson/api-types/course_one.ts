import type { IResData } from "@/services/axios";

export type IResGetCourse = IResData<Data>;

interface Data {
	id: number;
	isPublished: boolean;
	avgRating: number;
	rateCount: number;
	content: Content;
	chapters: Chapter[];
	points: number;
	createdAt: string;
	updatedAt: string;
}

interface Content {
	title: string;
	shortDesc: string;
	createdAt: string;
	updatedAt: string;
	longDesc: LongDesc;
}

interface LongDesc {
	content: string;
	contentJson: string;
}

export interface Chapter {
	id: number;
	title: string;
	index: number;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	units: Unit[];
}

export interface Unit {
	id: number;
	coverPath: null;
	contentId: number;
	exerciseId: null | number;
	points: number;
	index: number;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	content: Content2;
}

interface Content2 {
	id: number;
	title: string;
	shortDesc: string;
	createdAt: string;
	updatedAt: string;
	longDesc: LongDesc2;
}

interface LongDesc2 {
	content: string;
}
