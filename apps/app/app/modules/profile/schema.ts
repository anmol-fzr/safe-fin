import { type InferType, object, string } from "yup";

const demoGraphicsSchema = object({
	gender: string().required().label("Gender"),
	country: string().required().label("Country"),
	state: string().required().label("State"),
	city: string().required().label("City"),
	occupation: string().required().label("Occupation"),
	educationLevel: string().required().label("Education Level"),
});

const financialDetailsFormSchema = object({
	city: string().required().label("Stability"),
});

type DemoGraphicsSchema = InferType<typeof demoGraphicsSchema>;
type FinancialDetailsSchema = InferType<typeof financialDetailsFormSchema>;

export type { DemoGraphicsSchema, FinancialDetailsSchema };
export { demoGraphicsSchema, financialDetailsFormSchema };
