import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
	FormProvider,
	type UseFormReturn,
	useForm,
	useWatch,
} from "react-hook-form";
import { Button } from "@/components";
import { FormSelectChips } from "@/components/form/FormSelectChips";
import { FormSelectField } from "@/components/form/FormSelectField";
import { SelectChips } from "@/components/SelectChips";
import {
	getCitiesOpts,
	getCountriesOpts,
	getStatesOpts,
	useGetCitiesOptions,
	useGetCoutriesOptions,
	useGetStatesOptions,
} from "@/hooks/queries";
import { useUpdateDemoGraphics } from "../hooks/mutations";
import { getDemoGraphicsOpts } from "../hooks/queries";
import type { DemoGraphicsSchema } from "../schema";
import { demoGraphicsSchema } from "../schema";
import { educationLevels, genderOpts, occupationOpts } from "../utils/options";

const emptyFormState = {
	gender: "",
	occupation: "",
	educationLevel: "",
	country: "",
	state: "",
	city: "",
};

const useDemoGraphicsForm = () => {
	const queryClient = useQueryClient();

	const form = useForm({
		resolver: zodResolver(demoGraphicsSchema),
		defaultValues: async () => {
			const opts = getDemoGraphicsOpts();
			try {
				const data = await queryClient.fetchQuery(opts);

				if (data.data === null || data.isNew) {
					return emptyFormState;
				}
				const { country = "", state = "" } = data.data;

				queryClient.ensureQueryData(getCountriesOpts());
				if (country) {
					queryClient.ensureQueryData(getStatesOpts(country));
					if (state) {
						queryClient.ensureQueryData(getCitiesOpts(state, country));
					}
				}
				return data.data;
			} catch (error) {
				console.error("Get User Demo Graphics Data Failed", { cause: error });
				return emptyFormState;
			}
		},
	});

	return form;
};

export const DemoGraphicsForm = () => {
	const form = useDemoGraphicsForm();
	const { updateDemoGraphics } = useUpdateDemoGraphics();

	const onSubmit = form.handleSubmit((data) => {
		updateDemoGraphics(data);
	});

	return <DemoGraphicsFormImpl form={form} onSubmit={onSubmit} />;
};

interface DemoGraphicsFormImplProps {
	form: UseFormReturn<DemoGraphicsSchema, unknown, DemoGraphicsSchema>;
	onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

function DemoGraphicsFormImpl(props: DemoGraphicsFormImplProps) {
	const { form, onSubmit } = props;

	const country = useWatch({
		control: form.control,
		name: "country",
	});

	const state = useWatch({
		control: form.control,
		name: "state",
	});

	const { countries } = useGetCoutriesOptions();
	const { states } = useGetStatesOptions(country);
	const { cities } = useGetCitiesOptions(state, country);

	const { isSubmitting } = form.formState;

	return (
		<FormProvider {...form}>
			<FormSelectChips
				name="gender"
				label="Gender"
				valueRenderer={(option) => option.value}
				optionRenderer={SelectChips.IconOptionRenderer}
				options={genderOpts}
			/>

			<FormSelectChips
				name="occupation"
				label="Occupation"
				valueRenderer={(option) => option.value}
				optionRenderer={SelectChips.OptionRenderer}
				options={occupationOpts}
			/>

			<FormSelectChips
				name="educationLevel"
				label="Education Level"
				valueRenderer={(option) => option.value}
				optionRenderer={SelectChips.OptionRenderer}
				options={educationLevels}
			/>

			<FormSelectField
				name="country"
				label="Country"
				placeholder="e.g. India"
				options={countries}
			/>

			<FormSelectField
				name="state"
				label="State"
				placeholder="e.g. Punjab"
				options={states}
			/>

			<FormSelectField
				name="city"
				label="City"
				placeholder="e.g. Firozpur"
				options={cities}
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
