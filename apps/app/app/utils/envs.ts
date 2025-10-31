const env = process.env;
const isDev = env.EXPO_PUBLIC_MODE === "DEV" || __DEV__;

export const envs = Object.freeze({
	isDev,
	API_URL: isDev ? env.EXPO_PUBLIC_API_DEV_URL : env.EXPO_PUBLIC_API_PROD_URL,
	DOCS_URI: env.EXPO_PUBLIC_DOCS_URL,
	SENTRY: Object.freeze({
		DSN: env.EXPO_PUBLIC_SENTRY_DSN,
	}),
});
