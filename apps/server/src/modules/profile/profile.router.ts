import { createTypedFactory } from "@/factory";
import { getProfile, updateProfile } from "./profile.controller";

const { createApp } = createTypedFactory();

const profileRouter = createApp()
	.get("/", ...getProfile)
	.post("/", ...updateProfile);

export { profileRouter };
