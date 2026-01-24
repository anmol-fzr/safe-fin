import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { authenticate, userRole } from "@/middleware";
import { StorageService } from "./storage.service";

const app = new Hono<{ Bindings: CloudflareBindings }>();

const uploadSchema = z.object({
	filename: z.string(),
	contentType: z.string(),
	folder: z.enum(["safefin"]),
});

app.post(
	"/upload-url",
	authenticate,
	userRole("admin"),
	//zValidator("form", uploadSchema),
	async (c) => {
		const { filename, contentType, folder } = {
			filename: "cover_path",
			contentType: "image/png",
			folder: "covers",
		};
		//c.req.valid("form");
		//const { filename, contentType, folder } = c.req.valid("form");
		const env = c.env;

		const service = new StorageService({
			...env,
			S3_BUCKET: "safefin",
		});

		const result = await service.generateUploadUrl(
			filename,
			contentType,
			folder,
		);

		return c.json(result);
	},
);

export default app;
