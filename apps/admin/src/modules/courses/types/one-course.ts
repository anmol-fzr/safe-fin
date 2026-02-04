import type { IResData } from "@/services/api/types";

export type IResGetCourse = IResData<{
	id: number;
	isPublished: boolean;
	ratingSum: number;
	coverUrl: string;
	rateCount: number;
	createdAt: string;
	updatedAt: string;
	content: Content;
	chapters: Chapter[];
}>;

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

interface Chapter {
	id: number;
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
	exerciseId: any;
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
