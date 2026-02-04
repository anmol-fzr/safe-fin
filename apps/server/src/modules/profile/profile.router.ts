import { createTypedFactory } from "@/factory";
import {
	getAvatarObjectUploadUrl,
	getProfile,
	getProfileActivity,
	getPublicProfile,
	updateProfile,
} from "./profile.controller";

const { createApp } = createTypedFactory();

const profileRouter = createApp()
	.get("/public", ...getPublicProfile)
	.get("/", ...getProfile)
	.get("/activity", ...getProfileActivity)
	.post("/", ...updateProfile)
	.post("/avatar/upload-url", ...getAvatarObjectUploadUrl);

export { profileRouter };
