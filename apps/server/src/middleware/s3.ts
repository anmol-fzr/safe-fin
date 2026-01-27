import { env } from "hono/adapter";
import { createTypedFactory } from "@/factory";
import { StorageService } from "@/pkg/storage";

export interface BucketConfig {
	BUCKET: string;
	ENDPOINT: string;
}

const { createMiddleware } = createTypedFactory<{
	Variables: {
		storage: StorageService;
		s3: BucketConfig;
	};
}>();

const s3 = createMiddleware(async (c, next) => {
	const {
		S3_BUCKET,
		S3_ENDPOINT,
		S3_PUBLIC_ENDPOINT,
		S3_ACCESS_KEY_ID,
		S3_SECRET_ACCESS_KEY,
	} = env<{
		S3_BUCKET: string;
		S3_ENDPOINT: string;
		S3_PUBLIC_ENDPOINT: string;
		S3_ACCESS_KEY_ID: string;
		S3_SECRET_ACCESS_KEY: string;
	}>(c);

	const storage = new StorageService({
		bucket: S3_BUCKET,
		endpoint: S3_ENDPOINT,
		accessKeyId: S3_ACCESS_KEY_ID,
		secretAccessKey: S3_SECRET_ACCESS_KEY,
	});

	c.set("storage", storage);
	c.set("s3", {
		BUCKET: S3_BUCKET,
		ENDPOINT: S3_PUBLIC_ENDPOINT,
	});

	await next();
});

export { s3 };
