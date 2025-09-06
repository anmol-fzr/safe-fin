class IncorrectReducerAction extends Error {
	constructor(
		message = `Please Check you dispatch Call, the action type is not defined in reducer`,
	) {
		super(message);
	}
}

export { IncorrectReducerAction };
