import * as yup from "yup";
import { type InferType, object, string } from "yup";

const demoGraphicsSchema = object({
	gender: string().required().label("Gender"),
	country: string().required().label("Country"),
	state: string().required().label("State"),
	city: string().required().label("City"),
	occupation: string().required().label("Occupation"),
	educationLevel: string().required().label("Education Level"),
});

// Income & Stability
const stabilityValues = [
	"unstable",
	"moderate_low",
	"stable",
	"moderate_high",
	"independent",
];
const incomeRangeValues = [
	"unstable",
	"moderate_low",
	"stable",
	"moderate_high",
	"independent",
];

const boolValues = ["true", "false"];
const spendingFrequencyValues = ["often", "sometimes", "rarely"];
const spendingCatValues = ["food", "rent", "luxury", "travel", "subscriptions"];

const savingsHabitValues = ["regular", "occasional", "none"];

const debtsValues = ["credit_card", "student_loan", "personal_loan", "no_debt"];

const financialDetailsFormSchema = yup.object({
	stability: yup
		.string()
		.oneOf(stabilityValues, "Invalid financial stability selection.")
		.required("Financial stability is required."),

	income_range: yup
		.string()
		.oneOf(incomeRangeValues, "Invalid income range selection.")
		.required("Income range is required."),

	// Corresponds to the second `name="stablity"` (Do you track expenses?)
	track_expenses: yup
		.string()
		.oneOf(boolValues, "Please select if you track expenses.")
		.required("Tracking expenses is required."),

	spending_frequency: yup
		.string()
		.oneOf(spendingFrequencyValues, "Invalid spending frequency selection.")
		.required("Spending frequency is required."),

	spending_cats: yup
		.array()
		.of(yup.string().oneOf(spendingCatValues))
		.min(1, "Please select at least one spending category.")
		.required("Spending categories are required."),

	savings_habit: yup
		.string()
		.oneOf(savingsHabitValues, "Invalid savings habit selection.")
		.required("Savings habit is required."),

	emergency_fund_months: yup
		.number()
		.min(0, "Value must be 0 or more.")
		.max(12, "Value cannot exceed 12.")
		.required("Emergency fund months selection is required."),

	debts: yup
		.array()
		.of(yup.string().oneOf(debtsValues))
		.required("Please select all applicable debts (or 'No Debt')."),
});

type DemoGraphicsSchema = InferType<typeof demoGraphicsSchema>;
type FinancialDetailsSchema = InferType<typeof financialDetailsFormSchema>;

export type { DemoGraphicsSchema, FinancialDetailsSchema };
export { demoGraphicsSchema, financialDetailsFormSchema };
