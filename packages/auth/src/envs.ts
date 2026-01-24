const env = process.env;

const envs = Object.freeze({
	BETTER_AUTH: {
		URL: env.BETTER_AUTH_URL,
		SECRET: env.BETTER_AUTH_SECRET,
	},
	DB: {
		URL: env.DB_URl,
		TOKEN: env.DB_TOKEN,
	},
	GITHUB: {
		ID: env.GITHUB_CLIENT_ID,
		SECRET: env.GITHUB_CLIENT_SECRET,
	},
	CORS_URL: env.CORS_ORIGIN_URL,
});

export { envs };
