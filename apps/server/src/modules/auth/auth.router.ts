import { createTypedFactory } from "@/factory";
import { authHandler } from "./auth.controller";

const { createApp } = createTypedFactory();
const authRouter = createApp();

authRouter.on(["POST", "GET"], "*", ...authHandler);

export { authRouter };
