import { useOptimistic, useTransition } from "react";
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
	const { control, formState } = useFormContext();
	const { themed } = useAppTheme();
	const [isPending, startTransition] = useTransition();

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
						onChangeText={onChange}
						onBlur={onBlur}
						containerStyle={themed($textField)}
						status={
							disabled || isPending ? "disabled" : error ? "error" : undefined
						}
						helper={props.helper || error}
						{...props}
						renderValue={(value) => {
							const foundOption = props.options.find(
								(option) => option.value === value,
							);

							return foundOption?.label ?? props.placeholder;
						}}
						onSelect={(v) => {
							startTransition(() => {
								onChange(v);
							});
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
