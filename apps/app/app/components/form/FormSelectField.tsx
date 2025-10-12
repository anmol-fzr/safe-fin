import { Controller, useFormContext } from "react-hook-form";
import { View, type ViewStyle } from "react-native";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { SelectField, type SelectFieldProps } from "../SelectField";

type FormFieldProps = Omit<
	SelectFieldProps,
	"value" | "onChangeText" | "onBlur"
> & {
	name: string;
};

export const FormSelectField = (props: FormFieldProps) => {
	const { control, formState } = useFormContext();
	const { themed } = useAppTheme();

	type T = typeof formState.errors;

	const getValue = (obj: T, path: string) =>
		path.split(".").reduce((acc, key) => acc && acc[key], obj);

	const error = getValue(formState?.errors, props.name)?.message.toString();

	return (
		<View>
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, disabled } }) => (
					<SelectField
						value={value}
						renderValue={(value) => {
							if (props.multiple) {
								return value
									.map((v) => props.options.find((o) => o.value === v)?.label)
									.filter(Boolean)
									.join(", ");
							}
							const foundOption = props.options.find(
								(option) => option.value === value,
							);

							return foundOption?.label;
						}}
						onSelect={(v) => {
							if (props.multiple) {
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
						onChangeText={(val) => {
							console.log(val);
							onChange(val);
						}}
						onBlur={onBlur}
						containerStyle={themed($textField)}
						status={disabled ? "disabled" : error ? "error" : undefined}
						helper={props.helper || error}
						{...props}
					/>
				)}
				name={props.name}
			/>
			{/*
      <Text preset="error" >{error}</Text>
      */}
		</View>
	);
};

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginBottom: spacing.lg,
	borderRadius: spacing.xxl,
});
