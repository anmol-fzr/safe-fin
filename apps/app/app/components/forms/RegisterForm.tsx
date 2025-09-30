import { useNavigation } from "@react-navigation/native";
import { FormProvider } from "react-hook-form";
import type { ViewStyle } from "react-native";
import { Button } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useYupForm } from "@/hooks";
import { registerSchema } from "@/modules/Auth/schema";
import { useAuthStore } from "@/modules/Auth/store";
import type { ThemedStyle } from "@/theme";
import { authClient } from "@/utils/auth";
import { useAppTheme } from "@/utils/useAppTheme";

export const RegisterForm = () => {
	const methods = useYupForm({
		schema: registerSchema,
	});
	const { handleSubmit } = methods;
	const navigation = useNavigation();

	const setAuthState = useAuthStore((state) => state.setState);

	const { themed } = useAppTheme();

	const onSubmit = handleSubmit(async (data) => {
		await authClient.updateUser({
			name: data.name,
			//email: data.email,
		});

		setAuthState("complete");

		navigation.navigate("Welcome");
	});

	return (
		<>
			<FormProvider {...methods}>
				<FormField
					name="name"
					autoCapitalize="none"
					autoComplete="name"
					autoCorrect={false}
					labelTx="registerScreen:nameFieldLabel"
					placeholderTx="registerScreen:nameFieldPlaceholder"
				/>

				{/*
				<FormField
					name="email"
					autoCapitalize="none"
					autoComplete="email"
					autoCorrect={false}
					keyboardType="email-address"
					labelTx="registerScreen:emailFieldLabel"
					placeholderTx="registerScreen:emailFieldPlaceholder"
				/>
        */}
			</FormProvider>

			<Button
				testID="login-button"
				tx="common:submit"
				style={themed($tapButton)}
				preset="reversed"
				onPress={onSubmit}
			/>
		</>
	);
};

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginTop: spacing.xs,
});
