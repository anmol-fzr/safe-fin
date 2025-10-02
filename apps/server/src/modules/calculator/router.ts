import { createTypedFactory } from "../../factory";
import { getCalculatorConfig, createCalculatorMetadata } from "./controller";

const { createApp } = createTypedFactory();

const calculatorRouter = createApp()
	.get("/", ...getCalculatorConfig)
	.post(...createCalculatorMetadata);

export { calculatorRouter };
