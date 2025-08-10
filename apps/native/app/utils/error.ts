//throw new Error("useTheme must be used within a ThemeProvider")
//
class MissingContextError extends Error {
	constructor(hookName: string, providerName: string) {
		const err = `${hookName} must be used within a ${providerName}`;
		super(err);
	}
}

export { MissingContextError };
