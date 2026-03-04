import { createTypedFactory } from "@/factory";
import { StorageService } from "@/pkg/storage";
import { envs } from "@/utils/envs";

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
	const { S3 } = envs;
	const { BUCKET, ENDPOINT, PUBLIC_ENDPOINT, ACCESS_KEY, SECRET_KEY } = S3;

	const storage = new StorageService({
		bucket: BUCKET,
		endpoint: ENDPOINT,
		publicEndpoint: PUBLIC_ENDPOINT,
		accessKeyId: ACCESS_KEY,
		secretAccessKey: SECRET_KEY,
	});

	c.set("storage", storage);
	const s3 = getS3Config();

	c.set("s3", s3);

	await next();
});

const getS3Config = () => {
	const { S3 } = envs;
	const { BUCKET, PUBLIC_ENDPOINT } = S3;

	return {
		BUCKET: BUCKET,
		ENDPOINT: PUBLIC_ENDPOINT,
	};
};

export { s3, getS3Config };
