import type { IResData, NumericBool } from "@/services/axios";

export type IResGetCourse = IResData<SingleCourse>;

export interface SingleCourse {
	id: number;
	ratingSum: number;
	rateCount: number;
	coverUrl: string;
	isCompleted: NumericBool;
	points: number;
	content: Content;
	chapters: Chapter[];
	updatedAt: string;
}

interface Content {
	title: string;
	shortDesc: string;
	longDesc: {
		content: string;
	};
}

export interface Chapter {
	id: number;
	title: string;
	status: "LOCKED" | "ONGOING" | "COMPLETED";
	units: Unit[];
	exercises: Exercise[];
}

export interface Exercise {
	id: number;
	coverPath: null;
	title: string;
	desc: string;
	points: number;
	status: "LOCKED" | "UNLOCKED" | "COMPLETED";
}

export interface Unit {
	id: number;
	coverPath: null;
	points: number;
	status: "LOCKED" | "UNLOCKED" | "COMPLETED";
	content: {
		id: number;
		title: string;
		shortDesc: string;
		longDesc: {
			content: string;
		};
	};
}
