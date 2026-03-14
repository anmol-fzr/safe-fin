import { cache } from "hono/cache";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory();

const appCache = createMiddleware(
	cache({
		cacheName: "safefin-server",
		cacheControl: "public, must-revalidate, s-maxage=300, max-age=300",
		vary: ["Authorization"],
		cacheableStatusCodes: [200],
	}),
);

export { appCache };
