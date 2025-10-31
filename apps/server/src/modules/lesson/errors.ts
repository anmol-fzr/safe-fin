import { Responses } from "@/utils/error";

const LESSON_CODES = {
	LESSON_NOT_FOUND: "Lesson Not Found",
	LESSON_ADDED: "Lesson Added Successfully",
} as const;

const LessonErrors = {
	NotFound: () => Responses.NotFound(LESSON_CODES.LESSON_NOT_FOUND),
};

export { LESSON_CODES };
export { LessonErrors };
