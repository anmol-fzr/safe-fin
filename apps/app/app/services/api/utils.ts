import type { ZodObject } from "zod";
import { ERROR_MESSAGES, logger, SUCCESS_MESSAGES } from "@/utils/logger";

export const fallbackData = {
	data: [],
	paginate: {
		total: 0,
		nextPage: null,
		hasMore: false,
	},
};

interface ParseOptions<T> {
	schema: ZodObject;
	data: unknown;
	fallback: T;
	endpoint?: string;
}

/**
 * Safely parses API data using the given Zod schema.
 * Logs validation errors and returns fallback on failure.
 */
export function safeApiParse<T>({
	schema,
	data,
	fallback,
	endpoint,
}: ParseOptions<T>) {
	try {
		const result = schema.parse(data);

		logger.info(
			`${SUCCESS_MESSAGES.API.VALIDATION_SUCCESS} ${endpoint ? `, ${endpoint}` : ""}`,
		);

		return result;
	} catch (error) {
		logger.fatal(
			`${ERROR_MESSAGES.API.VALIDATION_FAILED} ${endpoint ? `, ${endpoint}` : ""}`,
			{ error },
		);

		return fallback;
	}
}
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
