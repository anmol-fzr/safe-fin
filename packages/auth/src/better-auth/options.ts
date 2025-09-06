import type { BetterAuthOptions } from "better-auth";
import { phoneNumber, admin, openAPI, multiSession } from "better-auth/plugins";
import { expo } from "@better-auth/expo";

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
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // Cache duration in seconds
		},
	},
	plugins: [
		expo(),
		admin({
			adminUserIds: ["F7EOrNtgbhOUA4FYvj0r7bN4eJykYGMb"],
		}),
		openAPI(),
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
