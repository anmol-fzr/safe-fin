class MiddlewareOrderError extends Error {
	constructor(message: string) {
		super(message);
	}
}

export { MiddlewareOrderError };
