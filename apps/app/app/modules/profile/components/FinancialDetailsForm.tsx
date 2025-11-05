import { yupResolver } from "@hookform/resolvers/yup";
import Slider from "@react-native-community/slider";
import { FormProvider, type UseFormReturn, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { Button } from "@/components";
import { Field } from "@/components/Field";
import { FormSelectChips } from "@/components/form/FormSelectChips";
import { Section } from "@/components/Section";
import { SelectChips } from "@/components/SelectChips";
import { useAppTheme } from "@/utils/useAppTheme";
import {
	type FinancialDetailsSchema,
	financialDetailsFormSchema,
} from "../schema";

const useFinancialDetailsForm = () => {
	//const queryClient = useQueryClient();

	const form = useForm({
		resolver: yupResolver(financialDetailsFormSchema),
		// defaultValues: async () => {
		// 	const opts = getFinancialDetailsOpts();
		// 	try {
		// 		const data = await queryClient.fetchQuery(opts);
		//
		// 		if (data.data === null || data.isNew) {
		// 			return emptyFormState;
		// 		}
		//
		// 		queryClient.ensureQueryData(getCountriesOpts());
		// 		queryClient.ensureQueryData(getStatesOpts(data.data.country));
		// 		queryClient.ensureQueryData(
		// 			getCitiesOpts(data.data.state, data.data.country),
		// 		);
		// 		return data.data;
		// 	} catch (error) {
		// 		console.error("Get User Demo Graphics Data Failed", { cause: error });
		// 		return emptyFormState;
		// 	}
		// },
	});

	return form;
};

export const FinancialDetailsForm = () => {
	const form = useFinancialDetailsForm();
	//const { updateFinancialDetails } = useUpdateFinancialDetails();

	const onSubmit = form.handleSubmit((data) => {
		console.log(data);
		//updateFinancialDetails(data);
	});

	return <FinancialDetailsFormImpl form={form} onSubmit={onSubmit} />;
};

interface FinancialDetailsFormImplProps {
	form: UseFormReturn<FinancialDetailsSchema, unknown, FinancialDetailsSchema>;
	onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function FinancialDetailsFormImpl(props: FinancialDetailsFormImplProps) {
	const { form, onSubmit } = props;

	const { isSubmitting } = form.formState;

	const {
		theme: { colors },
	} = useAppTheme();
	return (
		<FormProvider {...form}>
			<ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
				<Section title="Income & Stability">
					<View style={{ paddingHorizontal: 8 }}>
						<FormSelectChips
							name="stability"
							label="Financially Stability"
							valueRenderer={(option) => option.value}
							optionRenderer={SelectChips.OptionRenderer}
							options={stabilityOpts}
						/>
						<FormSelectChips
							name="income_range"
							label="Income Range"
							valueRenderer={(option) => option.value}
							optionRenderer={SelectChips.OptionRenderer}
							options={incomeRangeOpts}
						/>
					</View>
				</Section>

				<Section title="Spending Habits">
					<View style={{ paddingHorizontal: 8 }}>
						<FormSelectChips
							name="track_expenses"
							label="Do you track expenses?"
							valueRenderer={(option) => option.value}
							optionRenderer={SelectChips.EmojiOptionRenderer}
							options={boolOpts}
						/>

						<FormSelectChips
							name="spending_frequency"
							label="Impulse spending frequency"
							valueRenderer={(option) => option.value}
							optionRenderer={SelectChips.EmojiOptionRenderer}
							options={spendingHabitsOpts}
						/>

						<FormSelectChips
							name="spending_cats"
							label="Spending categories"
							multiple
							valueRenderer={(option) => option.value}
							optionRenderer={SelectChips.EmojiOptionRenderer}
							options={spendingCatOpts}
						/>
					</View>
				</Section>

				<Section title="Savings & Emergency Fund">
					<View style={{ paddingHorizontal: 8 }}>
						<FormSelectChips
							name="savings_habit"
							label="Savings habit"
							valueRenderer={(option) => option.value}
							optionRenderer={SelectChips.OptionRenderer}
							options={savingHabitsOpts}
						/>

						<Field>
							<Field.Label>Emergency Fund</Field.Label>
							<Slider
								value={4}
								step={1}
								minimumValue={0}
								maximumValue={12}
								lowerLimit={0}
								upperLimit={12}
								renderStepNumber
								minimumTrackTintColor={colors.palette.accent300}
								thumbTintColor={colors.palette.accent500}
								maximumTrackTintColor="#000000"
							/>
						</Field>
					</View>
				</Section>

				<Section title="Debt Exposure">
					<View style={{ paddingHorizontal: 8 }}>
						<FormSelectChips
							name="debts"
							label="Debts"
							multiple
							valueRenderer={(option) => option.value}
							optionRenderer={SelectChips.OptionRenderer}
							options={debtsOpts}
						/>
					</View>
				</Section>
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

const stabilityOpts = [
	{ label: "Struggling", value: "unstable" },
	{ label: "Getting By", value: "moderate_low" },
	{ label: "Stable", value: "stable" },
	{ label: "Comfortable", value: "moderate_high" },
	{ label: "Financially Independent", value: "independent" },
] as const;

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
