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
import type { DB } from "@/pkg/db";
import { eq, verification } from "@/pkg/db";

const GOOGLE_TEST_PHONE = "9876543210";
const GOOGLE_TEST_OTP = "123456:0";

interface GetBetterAuthOptions {
	db: DB;
}

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const getBetterAuthOptions = (params: GetBetterAuthOptions) => {
	const { db } = params;

	return {
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
			disableOriginCheck: true,
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
			expo({
				disableOriginOverride: true,
			}),
			admin({
				adminUserIds: ["F7EOrNtgbhOUA4FYvj0r7bN4eJykYGMb"],
			}),
			openAPI(),
			anonymous(),
			multiSession(),
			phoneNumber({
				allowedAttempts: 3,
				sendOTP: async ({ phoneNumber, code }) => {
					if (phoneNumber === GOOGLE_TEST_PHONE) {
						console.log("! Google Test Bot detected. Skipping SMS.");

						await db
							.update(verification)
							.set({
								value: GOOGLE_TEST_OTP,
								expiresAt: new Date(Date.now() + 1000 * 60 * 10),
							})
							.where(eq(verification.identifier, phoneNumber));
						console.info({ phoneNumber, code: GOOGLE_TEST_OTP });

						return;
					}

					console.info({ phoneNumber, code });
				},
				signUpOnVerification: {
					getTempEmail: (phoneNumber) => phoneNumber,
					getTempName: (phoneNumber) => phoneNumber,
				},
			}),
		],
	} satisfies BetterAuthOptions;
};
