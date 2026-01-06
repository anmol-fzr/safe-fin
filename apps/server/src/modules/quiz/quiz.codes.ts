import { Responses } from "@/utils/error";

const QUIZ_CODES = {
	NOT_FOUND: "Quiz Not Found",
	CREATE: {
		SUCCESS: "New Quiz Added Successfully",
		ERROR: "Unable to Add New Quiz",
	},
	UPDATE: {
		SUCCESS: "Quiz Updated Successfully",
		ERROR: "Unable to Update Quiz",
	},
	DELETE: {
		SUCCESS: "Quiz Deleted Successfully",
		ERROR: "Unable to Delete Quiz",
	},

	RESULT_SAVE: {
		SUCCESS: "Quiz Result Saved Successfully",
		ERROR: "Unable to Save Quiz Result",
	},
} as const;

const QuizErrors = {
	NotFound: () => Responses.NotFound(QUIZ_CODES.NOT_FOUND),
};

export { QUIZ_CODES, QuizErrors };
