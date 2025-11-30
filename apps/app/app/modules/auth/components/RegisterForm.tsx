import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import type { ViewStyle } from "react-native";
import { Button } from "@/components";
import { FormField } from "@/components/form/FormField";
import { FormSelectField } from "@/components/form/FormSelectField";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { useUpdateUser } from "@/modules/auth/hooks/useUpdateUser";
import { registerSchema } from "@/modules/auth/schema";
import { useAuthStore } from "@/modules/auth/store";
import { genderOpts } from "@/modules/profile/utils/options";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export const RegisterForm = () => {
	const methods = useForm({
		resolver: yupResolver(registerSchema),
	});
	const { handleSubmit } = methods;
	const navigation = useSafeNavigation();

	const setAuthState = useAuthStore((state) => state.setState);

	const { themed } = useAppTheme();
	const { updateUser } = useUpdateUser();

	const onSubmit = handleSubmit((data) => {
		updateUser(data);

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

				<BottomSheetModalProvider>
					<FormSelectField
						name="gender"
						label="Gender"
						placeholder="e.g. Male"
						options={genderOpts}
					/>
				</BottomSheetModalProvider>
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
