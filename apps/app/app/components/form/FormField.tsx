import { forwardRef, type Ref } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { type TextInput, View, type ViewStyle } from "react-native";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { TextField, type TextFieldProps } from "../TextField";

type FormFieldProps = Omit<
	TextFieldProps,
	"value" | "onChangeText" | "onBlur"
> & {
	name: string;
};

export const FormField = forwardRef(
	(props: FormFieldProps, ref: Ref<TextInput>) => {
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
						<TextField
							ref={ref}
							value={value}
							onChangeText={onChange}
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
	},
);

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginBottom: spacing.lg,
	borderRadius: spacing.xxl,
});
