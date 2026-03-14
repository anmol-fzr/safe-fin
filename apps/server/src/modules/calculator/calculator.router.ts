import { createTypedFactory } from "../../factory";
import {
	createCalculator,
	deleteCalculatorById,
	getCalculatorById,
	getCalculators,
} from "./calculator.controller";

const { createApp } = createTypedFactory();

const calculatorRouter = createApp()
	.get("/", ...getCalculators)
	.post("/", ...createCalculator)
	.get("/:calculatorId", ...getCalculatorById)
	.delete("/:calculatorId", ...deleteCalculatorById);

export { calculatorRouter };
