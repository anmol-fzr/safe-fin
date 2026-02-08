const env = process.env;

const envs = Object.freeze({
	BETTER_AUTH: {
		URL: env.BETTER_AUTH_URL,
		SECRET: env.BETTER_AUTH_SECRET,
	},
});

export { envs };
