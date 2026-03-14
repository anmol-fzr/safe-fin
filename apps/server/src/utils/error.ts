export function jsonResp<T>(body: T, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});
}

export function errResp(
	message: string,
	error: string,
	status = 400,
): Response {
	return jsonResp({ error, message }, status);
}

class MiddlewareOrderError extends Error {
	constructor(message: string) {
		super(message);
	}
}

const Responses = {
	BadRequest: (msg = "Bad Request", err = msg) => errResp(msg, err, 400),
	Unauthorized: (msg = "Unauthorized", err = msg) => errResp(msg, err, 401),
	Forbidden: (msg = "Forbidden", err = msg) => errResp(msg, err, 403),
	NotFound: (msg = "Not Found", err = msg) => errResp(msg, err, 404),
	InternalError: (msg = "Internal Server Error", err = msg) =>
		errResp(msg, err, 500),
};

export { MiddlewareOrderError };
export { Responses };
