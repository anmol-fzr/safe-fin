import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface GetStorageArgs {
	S3_REGION: string;
	S3_ENDPOINT: string;
	S3_ACCESS_KEY: string;
	S3_SECRET_KEY: string;
}

export function getStorage(env: GetStorageArgs) {
	const storage = new S3Client({
		region: env.S3_REGION,
		endpoint: env.S3_ENDPOINT,
		credentials: {
			accessKeyId: env.S3_ACCESS_KEY,
			secretAccessKey: env.S3_SECRET_KEY,
		},
		forcePathStyle: true,
	});

	return storage;
}

interface StorageServiceArgs extends GetStorageArgs {
	BUCKET_NAME: string;
}

export class StorageService {
	private s3: S3Client;
	private bucket: string;

	constructor(args: StorageServiceArgs) {
		const { BUCKET_NAME, ...config } = args;

		this.bucket = BUCKET_NAME;
		this.s3 = getStorage(config);
	}

	async getUploadUrl(key: string, contentType: string) {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: key,
			ContentType: contentType,
		});

		return getSignedUrl(this.s3, command, { expiresIn: 3_00 }); // 5 mins
	}
}
