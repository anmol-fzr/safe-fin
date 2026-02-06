import { createTypedFactory } from "@/factory";
import { createStreak } from "./streak.controller";

const { createApp } = createTypedFactory();

const streakRouter = createApp();

streakRouter.post("/", ...createStreak);

export { streakRouter };
