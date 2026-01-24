import { env } from "hono/adapter";
import { createTypedFactory } from "@/factory";

export interface BucketConfig {
	BUCKET: string;
	ENDPOINT: string;
}

const { createMiddleware } = createTypedFactory<{
	Variables: {
		s3: BucketConfig;
	};
}>();

const s3 = createMiddleware(async (c, next) => {
	const { S3_BUCKET, S3_ENDPOINT } = env(c);

	c.set("s3", {
		BUCKET: S3_BUCKET,
		ENDPOINT: S3_ENDPOINT,
	});

	await next();
});

export { s3 };
