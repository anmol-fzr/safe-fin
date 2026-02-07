const QUESTION_CODES = {
	NOT_FOUND: "Question Not Found",
	CREATE: {
		SUCCESS: "New Question Added Successfully",
		ERROR: "Unable to Add New Question",
	},
	// UPDATE: {
	// 	SUCCESS: "Quiz Updated Successfully",
	// 	ERROR: "Unable to Update Quiz",
	// },
	// DELETE: {
	// 	SUCCESS: "Quiz Deleted Successfully",
	// 	ERROR: "Unable to Delete Quiz",
	// },
	//
	// RESULT_SAVE: {
	// 	SUCCESS: "Quiz Result Saved Successfully",
	// 	ERROR: "Unable to Save Quiz Result",
	// },
} as const;

export { QUESTION_CODES };
