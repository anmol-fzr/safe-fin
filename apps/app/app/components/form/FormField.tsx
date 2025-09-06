import { Controller, useFormContext } from "react-hook-form";
import { TextField, type TextFieldProps } from "../TextField";
import { useAppTheme } from "@/utils/useAppTheme";
import { View, type ViewStyle } from "react-native";
import type { ThemedStyle } from "@/theme";

type FormFieldProps = Omit<
	TextFieldProps,
	"value" | "onChangeText" | "onBlur"
> & {
	name: string;
};

export const FormField = (props: FormFieldProps) => {
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
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						containerStyle={themed($textField)}
						status={(disabled && "disabled") || (error && "error") || undefined}
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
});
