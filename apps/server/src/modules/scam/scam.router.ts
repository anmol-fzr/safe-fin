import { createTypedFactory } from "@/factory";
import { getScams, getScamById } from "./scam.controller";

const { createApp } = createTypedFactory();

const scamRouter = createApp()
	.get("/", ...getScams)
	.get("/:scamId", ...getScamById);

export { scamRouter };
