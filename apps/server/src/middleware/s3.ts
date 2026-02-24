import { env } from "cloudflare:workers";
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
		S3_ACCESS_KEY,
		S3_SECRET_KEY,
	} = env;

	const storage = new StorageService({
		bucket: S3_BUCKET,
		endpoint: S3_ENDPOINT,
		publicEndpoint: S3_PUBLIC_ENDPOINT,
		accessKeyId: S3_ACCESS_KEY,
		secretAccessKey: S3_SECRET_KEY,
	});

	c.set("storage", storage);
	const s3 = getS3Config();

	c.set("s3", s3);

	await next();
});

const getS3Config = () => {
	const { S3_BUCKET, S3_PUBLIC_ENDPOINT } = env;

	return {
		BUCKET: S3_BUCKET,
		ENDPOINT: S3_PUBLIC_ENDPOINT,
	};
};

export { s3, getS3Config };
