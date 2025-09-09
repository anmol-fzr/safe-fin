const env = import.meta.env;

export const envs = Object.freeze({
	API_URL: env.VITE_PUBLIC_SERVER_URL ?? "http://localhost:3000",
	POSTHOG: Object.freeze({
		KEY: env.VITE_PUBLIC_POSTHOG_KEY,
		HOST: env.VITE_PUBLIC_POSTHOG_HOST,
	}),
	isDev: env.DEV,
});
