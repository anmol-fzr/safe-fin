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
import { Emailer, sendVerificationOTP } from "./email";
import { EmailOtps } from "./server";
import { DB } from "@safe-fin/db";
import { verification } from "@safe-fin/db/schema";

const GOOGLE_TEST_EMAIL = "bot@safefin.app";
const GOOGLE_TEST_OTP = "123456:0";

interface GetBetterAuthOptions {
	db: DB;
	isDev: boolean;
	EMAIL: EmailOtps;
}

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const getBetterAuthOptions = (params: GetBetterAuthOptions) => {
	const { isDev, db, EMAIL } = params;

	const secondaryStorage = undefined;

	const emailer = new Emailer(EMAIL);

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
					if (email === GOOGLE_TEST_EMAIL) {
						console.info("! Google Test Bot detected. Skipping SMS.");

						await db
							.update(verification)
							.set({
								value: GOOGLE_TEST_OTP,
								expiresAt: new Date(Date.now() + 1000 * 60 * 10),
							})
							.where(eq(verification.identifier, email));

						console.info({ email, otp: GOOGLE_TEST_OTP, type });
						return;
					}

					console.info({ email, otp, type });

					if (!isDev) {
						await emailer.sendOtp({ email, otp });
					}
				},
			}),
		],
	} satisfies BetterAuthOptions;
};
