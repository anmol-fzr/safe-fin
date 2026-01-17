import type { IResData } from "@/services/api/types";

export type IResGetUnit = IResData<{
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
	content: Content;
}>;

interface Content {
	id: number;
	title: string;
	shortDesc: string;
	longDescRichId: number;
	createdAt: string;
	updatedAt: string;
	longDesc: LongDesc;
}

interface LongDesc {
	content: string;
	contentJson: ContentJson;
}

interface ContentJson {}
