const env = process.env;

const envs = Object.freeze({
	isDev: env.MODE === "DEV",
	BETTER_AUTH: {
		URL: env.BETTER_AUTH_URL,
		SECRET: env.BETTER_AUTH_SECRET,
	},
	DB: {
		URL: env.DB_URL,
	},
	CORS_URL: env.CORS_URL,
	EMAIL: {
		CLIENT_ID: env.EMAIL_CLIENT_ID,
		CLIENT_SECRET: env.EMAIL_CLIENT_SECRET,
		REFRESH_TOKEN: env.EMAIL_REFRESH_TOKEN,
	},
});

export { envs };
