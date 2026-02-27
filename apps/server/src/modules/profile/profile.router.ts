import { createTypedFactory } from "@/factory";
import {
	getAvatarObjectUploadUrl,
	getProfile,
	getProfileActivity,
	getPublicProfile,
	updateProfile,
} from "./profile.controller";
import { profileLinkRouter } from "./profile-link";

const { createApp } = createTypedFactory();

const profileRouter = createApp()
	.get("/public", ...getPublicProfile)
	.get("/", ...getProfile)
	.get("/activity", ...getProfileActivity)
	.post("/", ...updateProfile)
	.post("/avatar/upload-url", ...getAvatarObjectUploadUrl)
	.route("/link", profileLinkRouter);

export { profileRouter };
