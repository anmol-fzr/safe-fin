import { createTypedFactory } from "@/factory";
import { updateLessonStatus } from "./lesson-status.controller";

const { createApp } = createTypedFactory();

const lessonStatusRouter = createApp();

lessonStatusRouter.post("/:id", ...updateLessonStatus);

export { lessonStatusRouter };
