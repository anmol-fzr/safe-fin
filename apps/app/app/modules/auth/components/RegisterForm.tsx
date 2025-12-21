import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSafeContext } from "@safe-fin/ui/hooks";
import { useRouter } from "expo-router";
import React, { createContext, type PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { ViewStyle } from "react-native";
import { Button, Text } from "@/components";
import { FormField } from "@/components/form/FormField";
import { FormSelectField } from "@/components/form/FormSelectField";
import { type TxKeyPath, translate } from "@/i18n";
import { useUpdateUser } from "@/modules/auth/hooks/useUpdateUser";
import { registerSchema } from "@/modules/auth/schema";
import { useAuthStore } from "@/modules/auth/store";
import { genderOpts } from "@/modules/profile/utils/options";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

// --- Context Definition ---

interface RegisterFormContextType {
	onSubmit: () => void;
	isPending: boolean;
}

const RegisterFormContext = createContext<RegisterFormContextType | null>(null);

const useRegisterFormContext = () => {
	return useSafeContext(
		RegisterFormContext,
		"useRegisterFormContext must be used within RegisterForm.Root",
	);
};

// --- Root Provider ---

export const RegisterFormRoot = ({ children }: PropsWithChildren) => {
	const methods = useForm({
		resolver: yupResolver(registerSchema),
		defaultValues: {
			name: "",
			gender: "",
		},
	});

	const router = useRouter();
	const setAuthState = useAuthStore((state) => state.setState);
	const { updateUser, isUpdatingUser } = useUpdateUser();

	const onSubmit = methods.handleSubmit((data) => {
		updateUser(data, {
			onSuccess: () => {
				setAuthState("complete");
				// Note: Use replace or navigate based on your flow requirements
				router.push("/");
			},
		});
	});

	return (
		<RegisterFormContext.Provider
			value={{ onSubmit, isPending: isUpdatingUser }}
		>
			<FormProvider {...methods}>{children}</FormProvider>
		</RegisterFormContext.Provider>
	);
};

// --- Sub-Components ---

const NameField = () => {
	return (
		<FormField
			name="name"
			autoCapitalize="none"
			autoComplete="name"
			autoCorrect={false}
			labelTx="registerScreen:nameFieldLabel"
			placeholderTx="registerScreen:nameFieldPlaceholder"
		/>
	);
};

const GenderField = () => {
	return (
		<BottomSheetModalProvider>
			<FormSelectField
				name="gender"
				label="Gender"
				placeholder="e.g. Male"
				options={genderOpts}
			/>
		</BottomSheetModalProvider>
	);
};

const EmailField = () => {
	return (
		<FormField
			name="email"
			autoCapitalize="none"
			autoComplete="email"
			autoCorrect={false}
			keyboardType="email-address"
			labelTx="registerScreen:emailFieldLabel"
			placeholderTx="registerScreen:emailFieldPlaceholder"
		/>
	);
};

const SubmitButton = ({ tx = "common:submit" as TxKeyPath }) => {
	const { onSubmit, isPending } = useRegisterFormContext();
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<Button
			style={[themed($actionBtn)]}
			preset="reversed"
			status={isPending ? "loading" : undefined}
			onPress={onSubmit}
		>
			<Text preset="subheading" style={{ color: colors.textInverse }}>
				{translate(tx)}
			</Text>
		</Button>
	);
};

const $actionBtn: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	//margin: spacing.lg,
	borderRadius: spacing.xl,
	borderWidth: 0,
});

// --- Styles & Export ---

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginTop: spacing.xs,
});

export const RegisterForm = Object.assign(RegisterFormRoot, {
	Root: RegisterFormRoot,
	Name: NameField,
	Gender: GenderField,
	Email: EmailField,
	Submit: SubmitButton,
});
