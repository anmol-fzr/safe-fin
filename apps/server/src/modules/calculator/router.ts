import { createTypedFactory } from "../../factory";
import { getCalculatorConfig } from "./controller";

const { createApp } = createTypedFactory();

const calculatorRouter = createApp().get("/", ...getCalculatorConfig);

export { calculatorRouter };
