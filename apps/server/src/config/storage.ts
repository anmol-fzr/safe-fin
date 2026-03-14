import { envs } from "@/utils/envs";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export function getStorage() {
	const storage = new S3Client({
		region: envs.S3.REGION,
		endpoint: envs.S3.ENDPOINT,
		credentials: {
			accessKeyId: envs.S3.ACCESS_KEY,
			secretAccessKey: envs.S3.SECRET_KEY,
		},
		forcePathStyle: true,
	});

	return storage;
}

export class StorageService {
	private s3: S3Client;
	private bucket: string;

	constructor() {
		this.bucket = envs.S3.BUCKET;
		this.s3 = getStorage();
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
