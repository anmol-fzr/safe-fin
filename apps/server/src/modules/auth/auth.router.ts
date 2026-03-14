import { createTypedFactory } from "@/factory";
import { authHndlr, setupAccountHndlr } from "./auth.controller";

const { createApp } = createTypedFactory();
const authRouter = createApp();

authRouter
	.post("/setup", ...setupAccountHndlr)
	.on(["POST", "GET"], "*", ...authHndlr);

export { authRouter };
