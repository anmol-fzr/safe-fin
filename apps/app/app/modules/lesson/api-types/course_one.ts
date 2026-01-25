import type { IResData, ITimestamps } from "@/services/axios";

export type IResGetCourse = IResData<Data>;

interface Data extends ITimestamps {
	id: number;
	isPublished: boolean;
	avgRating: number;
	rateCount: number;
	coverUrl: string;
	content: Content;
	chapters: Chapter[];
	points: number;
}

interface Content extends ITimestamps {
	title: string;
	shortDesc: string;
	longDesc: LongDesc;
}

interface LongDesc {
	content: string;
	contentJson: string;
}

export interface Chapter extends ITimestamps {
	id: number;
	title: string;
	index: number;
	isPublished: boolean;
	units: Unit[];
}

export interface Unit extends ITimestamps {
	id: number;
	coverPath: null;
	contentId: number;
	exerciseId: null | number;
	points: number;
	index: number;
	isPublished: boolean;
	isCompleted: 0 | 1;
	content: Content2;
}

interface Content2 extends ITimestamps {
	id: number;
	title: string;
	shortDesc: string;
	longDesc: LongDesc2;
}

interface LongDesc2 {
	content: string;
}
