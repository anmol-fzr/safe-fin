import { Responses } from "@/utils/error";

const LESSON_CODES = {
	NOT_FOUND: "Lesson Not Found",
	CREATE: {
		SUCCESS: "New Lesson Added Successfully",
		ERROR: "Unable to Add New Lesson",
	},
	UPDATE: {
		SUCCESS: "Lesson Updated Successfully",
		ERROR: "Unable to Update Lesson",
	},
	DELETE: {
		SUCCESS: "Lesson Deleted Successfully",
		ERROR: "Unable to Delete Lesson",
	},
} as const;

const LessonErrors = {
	NotFound: () => Responses.NotFound(LESSON_CODES.NOT_FOUND),
};

export { LESSON_CODES, LessonErrors };
