import { Responses } from "@/utils/error";

const CALCULATOR_CODES = {
	NOT_FOUND: "Calculator Not Found",
	CREATE: {
		SUCCESS: "New Calculator Added Successfully",
		ERROR: "Unable to Add New Calculator",
	},
	DELETE: {
		SUCCESS: "Calculator Deleted Successfully",
		ERROR: "Unable to Delete Calculator",
	},
} as const;

const CalculatorErrors = {
	NotFound: () => Responses.NotFound(CALCULATOR_CODES.NOT_FOUND),
};

export { CALCULATOR_CODES, CalculatorErrors };
