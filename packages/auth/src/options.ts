import { expo } from "@better-auth/expo";
import type { BetterAuthOptions } from "better-auth";
import {
	admin,
	anonymous,
	createAuthMiddleware,
	multiSession,
	openAPI,
	phoneNumber,
	emailOTP,
} from "better-auth/plugins";
import type { DB } from "@/pkg/db";
import { eq, verification } from "@/pkg/db";
import type { KVNamespace } from "@cloudflare/workers-types";
import type { SecondaryStorage } from "better-auth";
import { sendVerificationOTP } from "./email";
import { EmailOtps } from "./server";

const createKVSecondaryStorage = (
	kv: KVNamespace<string>,
	waitUntil?: (promise: Promise<any>) => void,
): SecondaryStorage => {
	const secondaryStorage: SecondaryStorage = {
		get: (key) => kv.get(key),
		set: (key, value, ttl) => {
			const promise = kv.put(key, value, { expirationTtl: ttl });
			if (waitUntil) {
				waitUntil(promise);
				return Promise.resolve();
			}
			return promise;
		},
		delete: (key) => {
			const promise = kv.delete(key);
			if (waitUntil) {
				waitUntil(promise);
				return Promise.resolve();
			}
			return promise;
		},
	};
	return secondaryStorage;
};

const GOOGLE_TEST_PHONE = "9876543210";
const GOOGLE_TEST_OTP = "123456:0";

interface GetBetterAuthOptions {
	isDev: boolean;
	DB: DB;
	EMAIL: EmailOtps;
	//KV?: KVNamespace<string>;
	//waitUntil?: (promise: Promise<any>) => void;
}

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const getBetterAuthOptions = (params: GetBetterAuthOptions) => {
	const { DB, isDev } = params;

	//const secondaryStorage = params?.KV ? createKVSecondaryStorage(params.KV, params.waitUntil) : undefined;
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
			},
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
					await sendVerificationOTP({ email, otp, ...params.EMAIL });
				},
			}),
			phoneNumber({
				allowedAttempts: 3,
				sendOTP: async ({ phoneNumber, code }) => {
					if (phoneNumber === GOOGLE_TEST_PHONE) {
						console.log("! Google Test Bot detected. Skipping SMS.");

						await DB.update(verification)
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
