import { FormProvider, type UseFormReturn, useForm } from "react-hook-form";
import { Button } from "@/components";
import { FormSelectChips } from "@/components/form/FormSelectChips";
import { SelectChips } from "@/components/SelectChips";
import type { FinancialDetailsSchema } from "../schema";

const useFinancialDetailsForm = () => {
	//const queryClient = useQueryClient();

	const form = useForm({
		//resolver: yupResolver(financialDetailsFormSchema),
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

	return (
		<FormProvider {...form}>
			<FormSelectChips
				name="stablity"
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

			<FormSelectChips
				name="income_range"
				label="Spending Habits"
				valueRenderer={(option) => option.value}
				optionRenderer={SelectChips.EmojiOptionRenderer}
				options={spendingHabitsOpts}
			/>

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
