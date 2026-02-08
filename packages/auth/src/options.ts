import { expo } from "@better-auth/expo";
import type { BetterAuthOptions } from "better-auth";
import {
	admin,
	anonymous,
	createAuthMiddleware,
	multiSession,
	openAPI,
	emailOTP,
} from "better-auth/plugins";
import { sendVerificationOTP } from "./email";
import { EmailOtps } from "./server";

const GOOGLE_TEST_PHONE = "9876543210";
const GOOGLE_TEST_OTP = "123456:0";

interface GetBetterAuthOptions {
	isDev: boolean;
	EMAIL: EmailOtps;
}

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const getBetterAuthOptions = (params: GetBetterAuthOptions) => {
	const { isDev } = params;

	const secondaryStorage = undefined;

	return {
		/**
		 * The name of the application.
		 */
		appName: "safe-fin-api",
		secondaryStorage,
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
			deleteUser: {
				enabled: true,
			},
			additionalFields: {
				isNew: {
					type: "boolean",
					defaultValue: true,
				},
				bio: {
					type: "string",
					input: true,
				},
			},
		},
		experimental: {
			joins: true,
		},
		advanced: {
			disableOriginCheck: true,
			defaultCookieAttributes: isDev
				? {
						httpOnly: true,
					}
				: {
						httpOnly: true,
						secure: true,
						sameSite: "none",
						path: "/",
					},
		},
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 216000, // Cache duration in seconds
			},
		},
		plugins: [
			expo({
				disableOriginOverride: true,
			}),
			admin({
				adminUserIds: ["F7EOrNtgbhOUA4FYvj0r7bN4eJykYGMb"],
			}),
			openAPI(),
			anonymous({
				generateName: () => "Guest",
			}),
			multiSession(),
			emailOTP({
				async sendVerificationOTP({ email, otp, type }) {
					console.info({ email, otp, type });
					if (!isDev) {
						await sendVerificationOTP({ email, otp, ...params.EMAIL });
					}
				},
			}),
		],
	} satisfies BetterAuthOptions;
};
