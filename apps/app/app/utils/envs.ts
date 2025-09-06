const env = process.env;

export const envs = Object.freeze({
	isDev: __DEV__,
	API_URL: env.EXPO_PUBLIC_API_URL,
	DOCS_URI: env.EXPO_PUBLIC_DOCS_URL,
});
