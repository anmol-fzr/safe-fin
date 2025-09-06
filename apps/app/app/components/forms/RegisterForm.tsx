import type { ViewStyle } from "react-native";
import { Button } from "@/components";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useStores } from "@/models";
import { FormProvider } from "react-hook-form";
import { FormField } from "@/components/form/FormField";
import { registerSchema } from "@/schema";
import { useYupForm } from "@/hooks";
import { useNavigation } from "@react-navigation/native";
import { authClient } from "@/utils/auth";

export const RegisterForm = () => {
	const methods = useYupForm({
		schema: registerSchema,
	});
	const { handleSubmit } = methods;
	const navigation = useNavigation();

	const {
		authenticationStore: { setAuthState },
	} = useStores();

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
