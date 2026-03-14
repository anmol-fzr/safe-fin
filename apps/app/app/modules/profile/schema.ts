import { z } from "zod";

const demoGraphicsSchema = z.object({
	gender: z.string({ error: "Gender is Required" }),
	country: z.string({ error: "Country is Required" }),
	state: z.string({ error: "State is Required" }),
	city: z.string({ error: "City is Required" }),
	occupation: z.string({ error: "Occupation is Required" }),
	educationLevel: z.string({
		error: "Education Level is Required",
	}),
});

const stabilityEnum = z.enum([
	"unstable",
	"moderate_low",
	"stable",
	"moderate_high",
	"independent",
]);

const incomeRangeEnum = z.enum([
	"unstable",
	"moderate_low",
	"stable",
	"moderate_high",
	"independent",
]);

const boolEnum = z.enum(["true", "false"]);

const spendingFrequencyEnum = z.enum(["often", "sometimes", "rarely"]);

const spendingCatEnum = z.enum([
	"food",
	"rent",
	"luxury",
	"travel",
	"subscriptions",
]);

const savingsHabitEnum = z.enum(["regular", "occasional", "none"]);

const debtsEnum = z.enum([
	"credit_card",
	"student_loan",
	"personal_loan",
	"no_debt",
]);

/* -----------------------------
   Financial Details (Zod)
------------------------------ */

const financialDetailsFormSchema = z.object({
	stability: stabilityEnum,

	income_range: incomeRangeEnum,

	track_expenses: boolEnum,

	spending_frequency: spendingFrequencyEnum,

	spending_cats: z
		.array(spendingCatEnum)
		.min(1, "Please select at least one spending category."),

	savings_habit: savingsHabitEnum,

	emergency_fund_months: z
		.number({
			error: "Emergency fund months selection is required.",
		})
		.min(0, "Value must be 0 or more.")
		.max(12, "Value cannot exceed 12."),

	debts: z
		.array(debtsEnum)
		.min(1, "Please select all applicable debts (or 'No Debt')."),
});

type DemoGraphicsSchema = z.infer<typeof demoGraphicsSchema>;
type FinancialDetailsSchema = z.infer<typeof financialDetailsFormSchema>;

export type { DemoGraphicsSchema, FinancialDetailsSchema };
export { demoGraphicsSchema, financialDetailsFormSchema };
