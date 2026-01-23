import { createTypedFactory } from "@/factory";
import {
	getProfile,
	getProfileActivity,
	updateProfile,
} from "./profile.controller";

const { createApp } = createTypedFactory();

const profileRouter = createApp()
	.get("/", ...getProfile)
	.get("/activity", ...getProfileActivity)
	.post("/", ...updateProfile);

export { profileRouter };
