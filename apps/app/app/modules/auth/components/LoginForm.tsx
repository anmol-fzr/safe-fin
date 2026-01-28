import { yupResolver } from "@hookform/resolvers/yup";
import { useSafeContext } from "@safe-fin/ui/hooks";
import * as Sentry from "@sentry/react-native";
import * as Burnt from "burnt";
import { useRouter } from "expo-router";
import React, {
	createContext,
	type PropsWithChildren,
	useCallback,
	useMemo,
	useRef,
} from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View, type ViewStyle } from "react-native";
import type { OtpInputRef } from "react-native-otp-entry";
import { Button, Text } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useCountdown } from "@/hooks/use-countdown";
import { type TxKeyPath, translate } from "@/i18n";
import { loginSchema } from "@/modules/auth/schema";
import { isUndefined } from "@/pkg/utils";
import { $styles, type ThemedStyle } from "@/theme";
import { getFakeEmail, getFakePhoneNumber } from "@/utils/faker/fields";
import { useAppTheme } from "@/utils/useAppTheme";
import { useGuestLogin } from "../hooks/use-guest-login";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { useAuthStore } from "../store";
import { FormOtpField } from "./FormOtpField";
import { useSendOtp } from "../hooks/useSendOtp";

// --- Context Definition ---

interface LoginFormContextType {
	isOtpSent: boolean;
	countdown: number;
	isResendDisabled: boolean;
	isGuestLoginPending: boolean;
	otpInputRef: React.RefObject<OtpInputRef>;
	handleSubmit: () => void;
	handleGuestLogin: () => void;
	changePhoneNumber: () => void;
}

const LoginFormContext = createContext<LoginFormContextType | null>(null);

const useLoginFormContext = () => {
	return useSafeContext(
		LoginFormContext,
		"useLoginFormContext must be used within LoginForm.Root",
	);
};

// --- Root Provider ---

export const LoginFormRoot = ({ children }: PropsWithChildren) => {
	const { countdown, reset, restart } = useCountdown(59);
	const otpInputRef = useRef<OtpInputRef>(null);
	const router = useRouter();

	const setAuthData = useAuthStore((state) => state.setData);
	const setAuthState = useAuthStore((state) => state.setState);

	const { sendOtp, isOtpSent, resetSentOtp } = useSendOtp();
	const { verifyOtpAsync } = useVerifyOtp();
	const { isGuestLoginPending, handleGuestLogin } = useGuestLogin();

	const form = useForm({
		resolver: yupResolver(loginSchema),
	});

	const handleVerifyOtp = async (payload: { email: string; otp: string }) => {
		try {
			await verifyOtpAsync(payload, {
				onSuccess(data) {
					if (data.error) return;
					restart();
					const { id, email, name } = data.data.user;

					Sentry.setUser({
						id: id,
						email: email,
					});

					setAuthData({ user: { id, email, name, isAnonymous: false } });
					setAuthState("complete");
					router.navigate("/tabs/home");
				},
			});
		} catch (error) {
			Burnt.toast({ title: "Something Went Wrong", preset: "error" });
		}
	};

	const handleSubmit = form.handleSubmit(async (data) => {
		if (!isOtpSent) {
			sendOtp(data.email);
			return;
		}
		if (isUndefined(data.otp)) {
			form.setError("otp", { message: "OTP is a required field" });
			return;
		}
		handleVerifyOtp({
			email: data.email,
			otp: data.otp.toString(),
		});
	});

	const changePhoneNumber = useCallback(() => {
		resetSentOtp();
		reset();
		form.resetField("otp");
	}, [reset, resetSentOtp, form]);

	const isResendDisabled = useMemo(() => countdown !== 0, [countdown]);

	const value = {
		isOtpSent,
		countdown,
		isResendDisabled,
		isGuestLoginPending,
		otpInputRef,
		handleSubmit,
		handleGuestLogin,
		changePhoneNumber,
	};

	return (
		<LoginFormContext.Provider value={value}>
			<FormProvider {...form}>{children}</FormProvider>
		</LoginFormContext.Provider>
	);
};

const EmailField = () => {
	const emailPlaceholder = getFakeEmail();
	const { isOtpSent, otpInputRef, handleSubmit } = useLoginFormContext();
	return (
		<FormField
			name="email"
			autoCapitalize="none"
			autoComplete="email"
			autoCorrect={false}
			status={isOtpSent ? "disabled" : undefined}
			onEndEditing={
				isOtpSent ? () => otpInputRef.current?.focus() : handleSubmit
			}
			keyboardType="email-address"
			labelTx="loginScreen:emailFieldLabel"
			placeholder={emailPlaceholder}
		/>
	);
};

const PhoneNumberField = () => {
	const phonePlaceholder = getFakePhoneNumber();
	const { isOtpSent, otpInputRef, handleSubmit } = useLoginFormContext();
	return (
		<FormField
			name="phoneNumber"
			autoCapitalize="none"
			autoComplete="tel"
			autoCorrect={false}
			status={isOtpSent ? "disabled" : undefined}
			onEndEditing={
				isOtpSent ? () => otpInputRef.current?.focus() : handleSubmit
			}
			keyboardType="phone-pad"
			labelTx="loginScreen:phoneFieldLabel"
			placeholder={phonePlaceholder}
		/>
	);
};

const OtpField = () => {
	const { isOtpSent, otpInputRef, handleSubmit } = useLoginFormContext();
	if (!isOtpSent) return null;
	return <FormOtpField ref={otpInputRef} name="otp" onFilled={handleSubmit} />;
};

const Timer = () => {
	const { isOtpSent, countdown, isResendDisabled, handleSubmit } =
		useLoginFormContext();
	const {
		theme: { colors },
	} = useAppTheme();

	if (!isOtpSent) return null;

	return (
		<View
			style={[
				$styles.row,
				{ justifyContent: "space-between", marginBottom: 8 },
			]}
		>
			<Text>00:{countdown < 10 ? `0${countdown}` : countdown}</Text>
			<Button
				text="Resend OTP"
				preset="text"
				onPress={handleSubmit}
				status={isResendDisabled ? "disabled" : undefined}
				textStyle={{
					color: isResendDisabled
						? colors.palette.neutral500
						: colors.palette.primary500,
				}}
			/>
		</View>
	);
};

const SubmitButton = ({
	txSend = "loginScreen:sendOtp" as TxKeyPath,
	txVerify = "loginScreen:verifyOtp" as TxKeyPath,
}) => {
	const { isOtpSent, isGuestLoginPending, handleSubmit } =
		useLoginFormContext();
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	const tx = isOtpSent ? txVerify : txSend;

	return (
		<Button
			style={[themed($actionBtn)]}
			preset="reversed"
			status={isGuestLoginPending ? "disabled" : undefined}
			onPress={handleSubmit}
		>
			<Text preset="subheading" style={{ color: colors.textInverse }}>
				{translate(tx)}
			</Text>
		</Button>
	);
};

const GuestLoginButton = () => {
	const { isOtpSent, isGuestLoginPending, handleGuestLogin } =
		useLoginFormContext();
	const { themed } = useAppTheme();

	if (isOtpSent) return;

	return (
		<Button
			style={themed($actionBtn)}
			loadingTx="loginScreen:guestLogInPending"
			status={isGuestLoginPending ? "loading" : undefined}
			onPress={handleGuestLogin}
		>
			<Text preset="subheading">{translate("loginScreen:guestLogIn")}</Text>
		</Button>
	);
};

const ChangeNumberButton = () => {
	const { isOtpSent, changePhoneNumber } = useLoginFormContext();
	const { themed } = useAppTheme();

	if (!isOtpSent) return null;

	return (
		<Button
			text="Change Phone Number"
			style={themed($tapButton)}
			preset="text"
			onPress={changePhoneNumber}
		/>
	);
};

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginTop: spacing.xs,
});

export const LoginForm = Object.assign(LoginFormRoot, {
	Root: LoginFormRoot,
	PhoneNumber: PhoneNumberField,
	Email: EmailField,
	Otp: OtpField,
	Timer: Timer,
	Submit: SubmitButton,
	GuestLogin: GuestLoginButton,
	ChangeNumber: ChangeNumberButton,
});

const $actionBtn: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	//margin: spacing.lg,
	borderRadius: spacing.xl,
	borderWidth: 0,
});
