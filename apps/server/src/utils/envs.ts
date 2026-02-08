import { env } from "cloudflare:workers";

export const envs = Object.freeze({
	CORS_ORIGIN_URL: env.CORS_ORIGIN_URL,
	BETTER_AUTH: Object.freeze({
		SECRET: env.BETTER_AUTH_SECRET,
		URL: env.BETTER_AUTH_URL,
	}),
	S3: Object.freeze({
		REGION: env.S3_REGION,
		BUCKET: env.S3_BUCKET,
		ENDPOINT: env.S3_ENDPOINT,
		PUBLIC_ENDPOINT: env.S3_PUBLIC_ENDPOINT,
		ACCESS_KEY: env.S3_ACCESS_KEY,
		SECRET_KEY: env.S3_SECRET_KEY,
	}),
	EMAIL: Object.freeze({
		CLIENT_ID: env.EMAIL_CLIENT_ID,
		CLIENT_SECRET: env.EMAIL_CLIENT_SECRET,
		REFRESH_TOKEN: env.EMAIL_REFRESH_TOKEN,
	}),
	SENTRY: Object.freeze({
		DSN: env.SENTRY_DSN,
	}),
	isDev: env.MODE === "DEV",
	MODE: env.MODE,
	DB: env.DB,
});
