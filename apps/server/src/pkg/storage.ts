import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type S3Config = {
	endpoint: string;
	publicEndpoint: string;
	accessKeyId: string;
	secretAccessKey: string;
	bucket: string;
	region?: string;
};

export class StorageService {
	private client: S3Client;
	private bucket: string;
	private endpoint: string;
	private publicEndpoint: string;

	constructor(config: S3Config) {
		this.bucket = config.bucket;
		this.endpoint = config.endpoint;
		this.publicEndpoint = config.publicEndpoint;

		this.client = new S3Client({
			endpoint: config.endpoint,
			region: config.region || "auto",
			credentials: {
				accessKeyId: config.accessKeyId,
				secretAccessKey: config.secretAccessKey,
			},
			forcePathStyle: true, // Needed for MinIO
		});
	}

	/**
	 * Creates a presigned URL for uploading a file (PUT)
	 * @param key The file path/name in the bucket
	 * @param expiresInSeconds Duration until URL expires
	 */
	async getUploadUrl(key: string, expiresInSeconds = 3600) {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: key,
		});

		const url = await getSignedUrl(this.client, command, {
			expiresIn: expiresInSeconds,
		});

		return {
			uploadUrl: url,
			fileUrl: key,
			publicUrl: `${this.publicEndpoint}/${key}`,
		};
	}

	/**
	 * Creates a presigned URL for viewing/downloading a file (GET)
	 * @param key The file path/name in the bucket
	 * @param expiresInSeconds Duration until URL expires
	 */
	async getDownloadUrl(key: string, expiresInSeconds = 3600): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: this.bucket,
			Key: key,
		});

		return await getSignedUrl(this.client, command, {
			expiresIn: expiresInSeconds,
		});
	}

	/**
	 * Directly uploads a file or stream to the bucket
	 * @param key The destination path/name
	 * @param body The file content (Buffer, Stream, String, etc.)
	 * @param contentType Optional MIME type
	 */
	async upload(key: string, body: any, contentType?: string) {
		const command = new PutObjectCommand({
			Bucket: this.bucket,
			Key: key,
			Body: body,
			ContentType: contentType,
		});

		return this.client.send(command);
	}
}
