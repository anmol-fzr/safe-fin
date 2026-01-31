import { createTypedFactory } from "@/factory";
import {
	getAvatarObjectUploadUrl,
	getProfile,
	getProfileActivity,
	updateProfile,
} from "./profile.controller";

const { createApp } = createTypedFactory();

const profileRouter = createApp()
	.get("/", ...getProfile)
	.get("/activity", ...getProfileActivity)
	.post("/", ...updateProfile)
	.post("/avatar/upload-url", ...getAvatarObjectUploadUrl);

export { profileRouter };
