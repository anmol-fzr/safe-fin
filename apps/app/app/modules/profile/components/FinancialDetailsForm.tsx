import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, type UseFormReturn, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Button } from "@/components";
import {
	FormSelectChips,
	type FormSelectChipsProps,
} from "@/components/form/FormSelectChips";
import { FormSlider } from "@/components/form/FormSlider";
import { SelectChips } from "@/components/SelectChips";
import {
	type FinancialDetailsSchema,
	financialDetailsFormSchema,
} from "../schema";
import { FinancialDetailSection } from "./FinancialDetailSection";

const stabilityOpts = [
	{ label: "Struggling", value: "unstable" },
	{ label: "Getting By", value: "moderate_low" },
	{ label: "Stable", value: "stable" },
	{ label: "Comfortable", value: "moderate_high" },
	{ label: "Financially Independent", value: "independent" },
] as const;

const useFinancialDetailsForm = () => {
	const form = useForm({
		resolver: yupResolver(financialDetailsFormSchema),
	});

	return form;
};

export const FinancialDetailsForm = () => {
	const form = useFinancialDetailsForm();

	const onSubmit = form.handleSubmit((data) => {
		console.log(data);
	});

	return <FinancialDetailsFormImpl form={form} onSubmit={onSubmit} />;
};

interface FinancialDetailsFormImplProps {
	form: UseFormReturn<FinancialDetailsSchema, unknown, FinancialDetailsSchema>;
	onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

type SectionItem = {
	title: string;
	fields: FieldItem[];
};

type FieldItem = {
	type: "chips";
	props: FormSelectChipsProps<any>;
};

function FinancialDetailsFormImpl(props: FinancialDetailsFormImplProps) {
	const { form, onSubmit } = props;

	const { isSubmitting } = form.formState;

	return (
		<FormProvider {...form}>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<FinancialDetailSection title="Income & Stability">
					<FormSelectChips
						name="stability"
						label="Financially Stability"
						options={stabilityOpts}
					/>
					<FormSelectChips
						name="income_range"
						label="Income Range"
						options={incomeRangeOpts}
					/>
				</FinancialDetailSection>

				<FinancialDetailSection title="Spending Habits">
					<FormSelectChips
						name="track_expenses"
						label="Do you track expenses?"
						optionRenderer={SelectChips.EmojiOptionRenderer}
						options={boolOpts}
					/>

					<FormSelectChips
						name="spending_frequency"
						label="Impulse spending frequency"
						optionRenderer={SelectChips.EmojiOptionRenderer}
						options={spendingHabitsOpts}
					/>

					<FormSelectChips
						name="spending_cats"
						label="Spending categories"
						multiple
						optionRenderer={SelectChips.EmojiOptionRenderer}
						options={spendingCatOpts}
					/>
				</FinancialDetailSection>

				<FinancialDetailSection title="Savings & Emergency Fund">
					<FormSelectChips
						name="savings_habit"
						label="Savings habit"
						options={savingHabitsOpts}
					/>
					<FormSlider name="emergency_fund_months" label="Emergency Funds" />
				</FinancialDetailSection>

				<FinancialDetailSection title="Debt Exposure">
					<FormSelectChips
						name="debts"
						label="Debts"
						multiple
						options={debtsOpts}
					/>
				</FinancialDetailSection>
			</ScrollView>

			<Button
				preset="reversed"
				disabled={isSubmitting}
				onPress={onSubmit}
				testID="update-btn"
			>
				{isSubmitting ? "Updating ..." : "Update"}
			</Button>
		</FormProvider>
	);
}

const incomeRangeOpts = [
	{ label: "Below ₹25K", value: "unstable" },
	{ label: "₹25K – ₹50K", value: "moderate_low" },
	{ label: "₹50K – ₹1L", value: "stable" },
	{ label: "₹1L – ₹2L", value: "moderate_high" },
	{ label: "Above ₹2L", value: "independent" },
] as const;

const spendingHabitsOpts = [
	{ label: "Often", value: "often", emoji: "😬" },
	{ label: "Sometimes", value: "sometimes", emoji: "😐" },
	{ label: "Rarely", value: "rarely", emoji: "😎" },
] as const;

const boolOpts = [
	{ label: "Yes", value: "true", emoji: "✅" },
	{ label: "No", value: "false", emoji: "❌" },
] as const;

const spendingCatOpts = [
	{ emoji: "🍔", label: "Food", value: "food" },
	{ emoji: "🏠", label: "Rent", value: "rent" },
	{ emoji: "💄", label: "Luxury", value: "luxury" },
	{ emoji: "🚗", label: "Travel", value: "travel" },
	{ emoji: "📱", label: "Subscriptions", value: "subscriptions" },
];

const savingHabitsOpts = [
	{ label: "Regular", value: "regular" },
	{ label: "Occasional", value: "occasional" },
	{ label: "None", value: "none" },
] as const;

const debtsOpts = [
	{
		label: "Credit Card",
		value: "credit_card",
	},
	{
		label: "Student Loan",
		value: "student_loan",
	},
	{
		label: "Personal Loan",
		value: "personal_loan",
	},
	{
		label: "No Debt",
		value: "no_debt",
	},
] as const;
