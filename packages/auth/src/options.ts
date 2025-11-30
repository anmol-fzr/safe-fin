import { expo } from "@better-auth/expo";
import type { BetterAuthOptions } from "better-auth";
import {
	admin,
	anonymous,
	createAuthMiddleware,
	multiSession,
	openAPI,
	phoneNumber,
} from "better-auth/plugins";

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const betterAuthOptions: BetterAuthOptions = {
	/**
	 * The name of the application.
	 */
	appName: "safe-fin-api",
	hooks: {
		after: createAuthMiddleware(async (ctx) => {
			if (ctx.path.endsWith("/update-user")) {
				const userId = ctx.context.session?.user.id;
				if (userId === undefined) {
					throw new Error(
						"[AUTH Package]: After Update User hook, userId must not be undefined",
					);
				}

				ctx.context.internalAdapter.updateUser(userId, {
					isNew: false,
				});
			}
		}),
	},
	user: {
		changeEmail: {
			enabled: true,
		},
		additionalFields: {
			isNew: {
				type: "boolean",
				defaultValue: true,
			},
		},
	},
	advanced: {
		defaultCookieAttributes: {
			httpOnly: true,
			//secure: true,
		},
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 216000, // Cache duration in seconds
		},
	},
	plugins: [
		expo(),
		admin({
			adminUserIds: ["F7EOrNtgbhOUA4FYvj0r7bN4eJykYGMb"],
		}),
		openAPI(),
		anonymous(),
		multiSession(),
		phoneNumber({
			allowedAttempts: 3,
			sendOTP: ({ phoneNumber, code }) => {
				console.info({ phoneNumber, code });
			},
			signUpOnVerification: {
				getTempEmail: (phoneNumber) => phoneNumber,
				getTempName: (phoneNumber) => phoneNumber,
			},
		}),
	],
};
