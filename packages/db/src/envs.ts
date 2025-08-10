const env = process.env;

const envs = Object.freeze({
  DB: {
    URL: env.TURSO_DB_URL,
    TOKEN: env.TURSO_DB_TOKEN
  }
})

export { envs }
