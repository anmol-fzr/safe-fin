import { Hono } from "hono";
import { getCalculatorConfig } from "./controller";

const calculatorRouter = new Hono();

calculatorRouter.get("/", ...getCalculatorConfig);

export { calculatorRouter };
