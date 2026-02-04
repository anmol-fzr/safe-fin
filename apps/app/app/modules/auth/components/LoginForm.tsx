import { yupResolver } from "@hookform/resolvers/yup";
import { useSafeContext } from "@safe-fin/ui/hooks";
import { useRouter } from "expo-router";
import React, { createContext, type PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, ViewProps, type ViewStyle } from "react-native";
import { Button, Text } from "@/components";
import { FormField } from "@/components/form/FormField";
import { loginSchema } from "@/modules/auth/schema";
import { makeSpringy, type ThemedStyle } from "@/theme";
import { getFakeEmail } from "@/utils/faker/fields";
import { useAppTheme } from "@/utils/useAppTheme";
import Animated, {
	FadeIn,
	FadeInDown,
	FadeInUp,
	FadeOut,
	FadeOutDown,
} from "react-native-reanimated";
import type { AnimatedProps } from "react-native-reanimated";
import { useSendOtp } from "../hooks/useSendOtp";
import { Form } from "@/components/form/Form";

interface LoginFormContextType {
	handleSubmit: VoidFunction;
	isSendingOtp: boolean;
}

const LoginFormContext = createContext<LoginFormContextType | null>(null);

const useLoginFormContext = () => {
	return useSafeContext(
		LoginFormContext,
		"useLoginFormContext must be used within LoginForm.Root",
	);
};

interface LoginFormRootProps extends PropsWithChildren {
	email?: string;
}

export const LoginFormRoot = (props: LoginFormRootProps) => {
	const { children, email = "" } = props;

	const router = useRouter();

	const form = useForm({
		resolver: yupResolver(loginSchema),
		defaultValues: {
			email,
		},
	});

	const { sendOtp, isSendingOtp } = useSendOtp();

	const handleSubmit = form.handleSubmit(async (data) => {
		const { email } = data;
		sendOtp(email, {
			onSuccess: () => {
				router.push({
					pathname: "/auth/verify",
					params: {
						email,
					},
				});
			},
		});
	});

	const value = {
		handleSubmit,
		isSendingOtp,
	};

	return (
		<LoginFormContext.Provider value={value}>
			<FormProvider {...form}>{children}</FormProvider>
		</LoginFormContext.Provider>
	);
};

const EmailField = () => {
	//const { handleSubmit } = useLoginFormContext();
	return (
		<Animated.View
			entering={makeSpringy(FadeIn)}
			exiting={makeSpringy(FadeOut)}
		>
			<Form.Email autoFocus={false} autoCorrect />
		</Animated.View>
	);
};

const Info = () => {
	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<Animated.View
			entering={makeSpringy(FadeInUp)}
			exiting={makeSpringy(FadeOutDown)}
		>
			<Text
				preset="default"
				size="xs"
				style={{
					textAlign: "center",
					marginTop: -30,
					color: colors.textDim,
				}}
			>
				We'll send you a
				<Text style={{ color: colors.tint }} preset="default" size="xs">
					{" "}
					OTP{" "}
				</Text>
				to sign in securely.
			</Text>
		</Animated.View>
	);
};

type ActionsProps = AnimatedProps<ViewProps>;

const Actions = (props: ActionsProps) => {
	const { children, style: $styleOverride, ...rest } = props;

	return (
		<Animated.View
			entering={makeSpringy(FadeInDown)}
			exiting={makeSpringy(FadeInUp)}
			style={[styles.actionsRoot, $styleOverride]}
			{...rest}
		>
			{children}
		</Animated.View>
	);
};

const SubmitButton = () => {
	const { isSendingOtp, handleSubmit } = useLoginFormContext();
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<Button
			style={themed($actionBtn)}
			preset="reversed"
			onPress={handleSubmit}
			status={isSendingOtp ? "loading" : undefined}
			loadingText="Sending OTP ..."
		>
			<Text
				preset="subheading"
				style={{ color: colors.textInverse }}
				tx="loginScreen:sendOtp"
			/>
		</Button>
	);
};

export const LoginForm = Object.assign(LoginFormRoot, {
	Root: LoginFormRoot,
	Email: EmailField,
	Info,
	Submit: SubmitButton,
	Actions,
});

const $actionBtn: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
	borderRadius: spacing.xl,
	borderWidth: 0,
	backgroundColor: colors.tint,
});

const styles = StyleSheet.create({
	actionsRoot: {
		flex: 1,
		justifyContent: "flex-end",
	},
});
