import { createFactory } from "hono/factory";
import type { HonoAppProps } from "..";
import { MiddlewareOrderError } from "@/utils/error";

const factory = createFactory<HonoAppProps>();
const roles = ["user", "admin"] as const;
type Role = (typeof roles)[number];

const userRole = (allowedRoles: Role | Role[]) =>
	factory.createMiddleware(async (c, next) => {
		const user = c.get("user");
		if (user === undefined || user === null) {
			throw new MiddlewareOrderError(
				"`userRole` middleware must be used after `authenticate` middleware",
			);
			return c.json(
				{
					message: "Something Went Wrong",
				},
				500,
			);
		}

		const role = user.role;

		if (Array.isArray(allowedRoles)) {
			if (!allowedRoles.includes(role)) {
				return c.text("Forbidden", 403);
			}
		}
		if (allowedRoles !== role) {
			return c.text("Forbidden", 403);
		}

		return next();
	});

export { userRole };
