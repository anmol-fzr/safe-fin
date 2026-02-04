import { forwardRef, type Ref } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { type TextInput } from "react-native";
import { TextField, type TextFieldProps } from "../TextField";

export interface FormFieldProps
	extends Omit<TextFieldProps, "value" | "onChangeText" | "onBlur"> {
	name: string;
}

export const FormField = forwardRef(
	(props: FormFieldProps, ref: Ref<TextInput>) => {
		const { style: $styleOverride, ...rest } = props;

		const { control, formState } = useFormContext();

		type T = typeof formState.errors;

		const getValue = (obj: T, path: string) =>
			path.split(".").reduce((acc, key) => acc && acc[key], obj);

		const error = getValue(formState?.errors, props.name)?.message.toString();

		return (
			<Controller
				control={control}
				render={({ field: { onChange, onBlur, value, disabled } }) => (
					<TextField
						ref={ref}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						status={disabled ? "disabled" : error ? "error" : undefined}
						helper={props.helper || error}
						{...rest}
					/>
				)}
				name={props.name}
			/>
		);
	},
);
