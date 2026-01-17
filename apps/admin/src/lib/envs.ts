const env = import.meta.env;

export const envs = Object.freeze({
	API_URL: env.VITE_PUBLIC_SERVER_URL ?? "http://192.168.29.57:3000/api/v1",
	AUTH_API_URL: `${env.VITE_PUBLIC_SERVER_URL}/auth`,

	POSTHOG: Object.freeze({
		KEY: env.VITE_PUBLIC_POSTHOG_KEY,
		HOST: env.VITE_PUBLIC_POSTHOG_HOST,
	}),
	isDev: env.DEV,
});
