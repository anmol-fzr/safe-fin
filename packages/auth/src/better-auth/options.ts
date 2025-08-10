import type { BetterAuthOptions } from "better-auth";
import { phoneNumber, admin, openAPI } from "better-auth/plugins";
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
		admin(),
		openAPI(),
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
