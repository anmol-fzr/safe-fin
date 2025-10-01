import { createTypedFactory } from "../../factory";
import { saveQuizResult } from "./controller";

const { createApp } = createTypedFactory();

const quizResultRouter = createApp().post("/", ...saveQuizResult);

export { quizResultRouter };
