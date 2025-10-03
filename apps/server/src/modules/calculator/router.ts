import { createTypedFactory } from "../../factory";
import { createCalculatorMetadata, getCalculatorConfig } from "./controller";

const { createApp } = createTypedFactory();

const calculatorRouter = createApp()
	.get("/", ...getCalculatorConfig)
	.post(...createCalculatorMetadata);

export { calculatorRouter };
