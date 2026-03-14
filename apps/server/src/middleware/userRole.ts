import type { User } from "@/pkg/auth";
import { MiddlewareOrderError } from "@/utils/error";
import { createTypedFactory } from "../factory";

const { createMiddleware } = createTypedFactory<{
	Variables: {
		user: User;
	};
}>();

const roles = ["user", "admin"] as const;
type Role = (typeof roles)[number];

const userRole = (allowedRoles: Role | Role[]) =>
	createMiddleware(async (c, next) => {
		const user = c.get("user");
		if (user === undefined || user === null) {
			throw new MiddlewareOrderError(
				"`userRole` middleware must be used after `authenticate` middleware",
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
