import { secureHeaders } from "hono/secure-headers";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory();

const appCsp = createMiddleware(
	secureHeaders({
		contentSecurityPolicy: {
			defaultSrc: ["'self'"],
			scriptSrc: ["self"],
		},
	}),
);

export { appCsp };
