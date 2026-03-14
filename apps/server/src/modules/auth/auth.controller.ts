import { auth } from "@/pkg/auth";
import { createTypedFactory } from "@/factory";
import { authenticate, userRole } from "@/middleware";
import * as Sentry from "@sentry/cloudflare";
import { streakInitQuery, publicProfileInitQuery } from "./auth.query";

const { createHandlers } = createTypedFactory();

const authHndlr = createHandlers(async (c) => {
	return auth().handler(c.req.raw);
});

const setupAccountHndlr = createHandlers(
	authenticate,
	userRole("user"),
	async (c) => {
		const user = c.get("user");

		try {
			await Promise.all([
				streakInitQuery.run({ userId: user.id }),
				publicProfileInitQuery.run({ userId: user.id }),
			]);
		} catch (error) {
			Sentry.logger.error(error?.message, {
				reason: error,
			});
		}

		return c.json({
			data: null,
			success: true,
		});
	},
);

export { authHndlr, setupAccountHndlr };
