import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export class StorageService {
    private s3: S3Client;
    private bucket: string;
    private publicUrl: string;

    constructor(env: CloudflareBindings) {
        this.bucket = env.S3_BUCKET;
        this.publicUrl = env.PUBLIC_S3_URL;

        // Initialize S3 Client
        // In Serverless, this connection is stateless and lightweight
        this.s3 = new S3Client({
            region: env.S3_REGION || "auto",
            endpoint: env.S3_ENDPOINT,
            credentials: {
                accessKeyId: env.S3_ACCESS_KEY,
                secretAccessKey: env.S3_SECRET_KEY,
            },
            forcePathStyle: true, // Required for Minio compatibility
        });
    }

    async generateUploadUrl(
        fileName: string,
        contentType: string,
        folder?: string,
    ) {
        const prefix = folder ? `${folder}/` : "";
        // Create a unique key (path) for the file
        const key = `${prefix}${crypto.randomUUID()}-${fileName}`;

        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            ContentType: contentType,
            // ACL: "public-read", // Uncomment if your bucket isn't public by default
        });

        // Generate the URL. This does NOT make a network request to S3.
        // It simply signs the string using the secret key. Very fast.
        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 60 * 10 }); // 10 minutes

        return {
            uploadUrl,
            // This is the URL we will save in the DB
            // We return relative path to handle flexibility
            fileUrl: key,
            publicUrl: `${this.publicUrl}/${this.bucket}/${key}`,
        };
    }
}
