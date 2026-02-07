import { createTypedFactory } from "@/factory";
import { createOption } from "./option.controller";

const { createApp } = createTypedFactory();

const optionRouter = createApp();

optionRouter.post("/", ...createOption);

export { optionRouter };
