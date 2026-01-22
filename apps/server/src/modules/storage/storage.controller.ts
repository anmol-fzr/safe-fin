import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { authenticate, userRole } from "@/middleware";
import { StorageService } from "./storage.service";

const app = new Hono<{ Bindings: CloudflareBindings }>();

const uploadSchema = z.object({
	filename: z.string(),
	contentType: z.string(),
	folder: z.enum(["safefin-courses", "avatars", "chapters", "units"]),
});

app.post(
	"/upload-url",
	authenticate,
	userRole("admin"),
	zValidator("json", uploadSchema),
	async (c) => {
		const { filename, contentType, folder } = c.req.valid("json");
		const env = c.env;

		const service = new StorageService({
			...env,
			S3_BUCKET: folder,
		});
		const result = await service.generateUploadUrl(filename, contentType, "");

		return c.json(result);
	},
);

export default app;
