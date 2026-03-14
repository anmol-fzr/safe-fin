import { expo } from "@better-auth/expo";
import { type DB, eq } from "@safe-fin/db";
import { verification } from "@safe-fin/db/schema";
import type { BetterAuthOptions, CookieOptions } from "better-auth";
import { admin as adminPlugin, emailOTP } from "better-auth/plugins";
import { Emailer } from "./email";
import type { EmailOtps } from "./server";
import { ac, roles } from "./access-control";

interface GetBetterAuthOptions {
	db: DB;
	isDev: boolean;
	EMAIL: EmailOtps;
	TEST_CREDS: {
		EMAIL: string;
		OTP: string;
	};
}

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const getBetterAuthOptions = (params: GetBetterAuthOptions) => {
	const { isDev, db, EMAIL, TEST_CREDS } = params;

	const emailer = new Emailer(EMAIL);

	let defaultCookieAttributes: CookieOptions = {
		httpOnly: true,
		secure: true,
		sameSite: "none",
		path: "/",
	};

	if (isDev) {
		defaultCookieAttributes = {
			httpOnly: true,
		};
	}

	return {
		appName: "safe-fin-api",
		user: {
			changeEmail: {
				enabled: true,
			},
			deleteUser: {
				enabled: true,
			},
			additionalFields: {
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
			defaultCookieAttributes,
		},
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 216000,
			},
		},
		plugins: [
			expo({
				disableOriginOverride: true,
			}),
			adminPlugin({
				ac,
				roles,
			}),
			emailOTP({
				async sendVerificationOTP({ email, otp, type }) {
					const { EMAIL, OTP } = TEST_CREDS;

					if (email === EMAIL) {
						console.info("! Google Test Bot detected. Skipping SMS.");

						try {
							console.log("Overwritting OTP with Test OTP ");
							await db
								.update(verification)
								.set({
									value: `${OTP}:0`,
									expiresAt: new Date(Date.now() + 1000 * 60 * 10),
								})
								.where(eq(verification.identifier, email));
							console.log("Successfully Overwritten OTP with Test OTP ");
						} catch (error) {
							console.log(error);
							console.log("Unable to  Overwrite OTP with Test OTP ");
						}

						console.info({ email, otp: OTP, type });
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
