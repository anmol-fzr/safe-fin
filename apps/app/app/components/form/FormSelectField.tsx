import { Controller, useFormContext } from "react-hook-form";
import type { ViewStyle } from "react-native";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Field } from "../Field";
import { SelectField, type SelectFieldProps } from "../SelectField";

type FormFieldProps = Omit<
	SelectFieldProps,
	"value" | "onChangeText" | "onBlur" | "renderValue" | "onSelect"
> & {
	name: string;
};

export const FormSelectField = (props: FormFieldProps) => {
	const multiple = false;
	const { control, formState } = useFormContext();
	const { themed } = useAppTheme();

	type T = typeof formState.errors;

	const getValue = (obj: T, path: string) =>
		path.split(".").reduce((acc, key) => acc && acc[key], obj);

	const error = getValue(formState?.errors, props.name)?.message.toString();

	return (
		<Field>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, disabled } }) => (
					<SelectField
						value={value}
						onChangeText={(val) => {
							console.log(val);
							onChange(val);
						}}
						onBlur={onBlur}
						containerStyle={themed($textField)}
						status={disabled ? "disabled" : error ? "error" : undefined}
						helper={props.helper || error}
						multiple={multiple}
						{...props}
						renderValue={(value) => {
							const foundOption = props.options.find(
								(option) => option.value === value,
							);

							return foundOption?.label ?? props.placeholder;
						}}
						onSelect={(v) => {
							if (multiple) {
								if (Array.isArray(v)) {
									onChange(v);
								} else {
									onChange([v]);
								}
							} else {
								if (Array.isArray(v)) {
									onChange(v[0]);
								} else {
									onChange(v);
								}
							}
						}}
					/>
				)}
				name={props.name}
			/>
		</Field>
	);
};

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	//marginBottom: spacing.lg,
	borderRadius: spacing.xxl,
});
