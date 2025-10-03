import { expo } from "@better-auth/expo";
import type { BetterAuthOptions } from "better-auth";
import { admin, multiSession, openAPI, phoneNumber } from "better-auth/plugins";

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
	user: {
		changeEmail: {
			enabled: true,
		},
		additionalFields: {
			isNew: {
				type: "boolean",
				defaultValue: true,
			},
			dob: {
				type: "date",
				defaultValue: new Date(),
				required: true,
			},
			gender: {
				type: "date",
				defaultValue: new Date(),
				required: true,
			},
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
