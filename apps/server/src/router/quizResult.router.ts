import { Hono } from "hono";
import { saveQuizResult } from "@/controller";
import type { HonoAppProps } from "..";

const quizResultRouter = new Hono<HonoAppProps>();

quizResultRouter.post("/", ...saveQuizResult);

export { quizResultRouter };
