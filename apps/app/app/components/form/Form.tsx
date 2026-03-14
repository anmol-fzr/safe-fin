import { FormProvider } from "react-hook-form";
import { FormField, FormFieldProps } from "./FormField";
import { ComponentProps, useMemo } from "react";
import { faker } from "@faker-js/faker/locale/en";
import { View, ViewProps } from "react-native";
import { spacing } from "@/theme";

type FormEmailFieldProps = Partial<FormFieldProps>;

function FormRoot(props: ComponentProps<typeof FormProvider>) {
	const { children, ...form } = props;

	return (
		<FormProvider {...form}>
			<View style={{ gap: spacing.lg }}>{children}</View>
		</FormProvider>
	);
}

FormRoot.Fields = (props: ViewProps) => {
	const { children, style: $styleOverride, ...rest } = props;

	return (
		<View style={[{ gap: spacing.sm }, $styleOverride]} {...rest}>
			{children}
		</View>
	);
};

FormRoot.Actions = FormRoot.Fields;

FormRoot.Email = (props: FormEmailFieldProps) => {
	const placeholder = useMemo(() => faker.internet.email().toLowerCase(), []);

	return (
		<FormField
			name="email"
			autoCapitalize="none"
			autoComplete="email"
			autoFocus={false}
			autoCorrect
			keyboardType="email-address"
			label="Email Address"
			placeholder={placeholder}
			{...props}
		/>
	);
};

const Form = Object.assign(FormRoot, {
	Root: FormRoot,
});

export { Form };
