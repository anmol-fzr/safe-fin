import { createTypedFactory } from "@/factory";
import { createQuestion } from "./question.controller";

const { createApp } = createTypedFactory();

const questionRouter = createApp();

questionRouter.post("/", ...createQuestion);
//.get("/", ...getQuestions)
//.get("/:questionId", ...getQuestionById);

export { questionRouter };
