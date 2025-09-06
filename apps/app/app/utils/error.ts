//throw new Error("useTheme must be used within a ThemeProvider")
//
class MissingContextError extends Error {
	constructor(hookName: string, providerName: string) {
		const err = `${hookName} must be used within a ${providerName}`;
		super(err);
	}
}

class MissingRouteParamError extends Error {
	constructor(paramName: string, screenName: string) {
		const err = `${paramName} route param missing on ${screenName}`;
		super(err);
	}
}

export { MissingContextError, MissingRouteParamError };
