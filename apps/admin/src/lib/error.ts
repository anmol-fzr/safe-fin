class IncorrectReducerAction extends Error {
	constructor(
		message = `Please Check you dispatch Call, the action type is not defined in reducer`,
	) {
		super(message);
	}
}

class MissingContextError extends Error {
	constructor(hookName: string, providerName: string) {
		const err = `${hookName} must be used within a ${providerName}`;
		super(err);
	}
}

export { IncorrectReducerAction, MissingContextError };
