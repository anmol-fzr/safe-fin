const env = process.env;

const envs = Object.freeze({
	DB: Object.freeze({
		URL: env.DB_URL,
	}),

	CLOUDFLARE: Object.freeze({
		ACCOUNT_ID: env.CLOUDFLARE_ACCOUNT_ID,
		DATABASE_ID: env.CLOUDFLARE_DATABASE_ID,
		D1_TOKEN: env.CLOUDFLARE_D1_TOKEN,
	}),
});

export { envs };
