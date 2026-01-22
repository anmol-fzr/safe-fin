import { createTypedFactory } from "../../factory";
import { getSavedEntityHandler } from "./saved.controller";

const { createApp } = createTypedFactory();

const savedRouter = createApp();

savedRouter.get("/", ...getSavedEntityHandler);
// .post("/", ...createQuiz)
// .get("/:id", ...getQuizById)
// .patch("/:id", ...updateQuizById)
// .post("/result", ...saveQuizResult);

export { savedRouter };
