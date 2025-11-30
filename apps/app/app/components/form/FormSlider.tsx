import Slider from "@react-native-community/slider";
import { Controller, useFormContext } from "react-hook-form";
import { Field } from "@/components/Field";
import { useAppTheme } from "@/utils/useAppTheme";

interface FormSliderProps {
	name: string;
	label: string;
}

export const FormSlider = (props: FormSliderProps) => {
	const { name, label } = props;
	const { control } = useFormContext();
	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<Field>
					<Field.Label>{label}</Field.Label>
					<Slider
						value={field.value}
						step={1}
						minimumValue={0}
						maximumValue={12}
						lowerLimit={0}
						upperLimit={12}
						disabled={field.disabled}
						onValueChange={field.onChange}
						renderStepNumber
						minimumTrackTintColor={colors.palette.accent300}
						thumbTintColor={colors.palette.accent500}
						maximumTrackTintColor="#000000"
					/>
				</Field>
			)}
		/>
	);
};
