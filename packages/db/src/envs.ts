const env = process.env;

const envs = Object.freeze({
	DB: Object.freeze({
		URL: env.DB_URL,
		TOKEN: env.DB_TOKEN,
	}),
});

export { envs };
