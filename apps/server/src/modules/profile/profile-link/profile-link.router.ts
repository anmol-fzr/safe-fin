import { createTypedFactory } from "@/factory";
import {
	addUserProfileLinkHndlr,
	deleteUserProfileLinkHndlr,
} from "./profile-link.controller";

const { createApp } = createTypedFactory();

const profileLinkRouter = createApp()
	.post("/", ...addUserProfileLinkHndlr)
	.delete("/:id", ...deleteUserProfileLinkHndlr);

export { profileLinkRouter };
