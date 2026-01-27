import { createTypedFactory } from "@/factory";
import { StorageService } from "@/pkg/storage";
import { env } from "cloudflare:workers";

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
		S3_ACCESS_KEY,
		S3_SECRET_KEY,
	} = env;

	const storage = new StorageService({
		bucket: S3_BUCKET,
		endpoint: S3_ENDPOINT,
		accessKeyId: S3_ACCESS_KEY,
		secretAccessKey: S3_SECRET_KEY,
	});

	c.set("storage", storage);
	c.set("s3", {
		BUCKET: S3_BUCKET,
		ENDPOINT: S3_PUBLIC_ENDPOINT,
	});

	await next();
});

export { s3 };
