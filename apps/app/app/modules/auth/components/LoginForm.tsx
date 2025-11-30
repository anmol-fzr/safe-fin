import { yupResolver } from "@hookform/resolvers/yup";
import { useSendOtp, useVerifyOtp } from "@safe-fin/ui/hooks";
import { useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { isUndefined } from "lodash";
import { useCallback, useMemo, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import type { OtpInputRef } from "react-native-otp-entry";
import { Button, Text } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useCountdown } from "@/hooks";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { loginSchema } from "@/modules/auth/schema";
import { $styles, type ThemedStyle } from "@/theme";
import { getFakePhoneNumber } from "@/utils/faker/fields";
import { useAppTheme } from "@/utils/useAppTheme";
import { useGuestLogin } from "../hooks/use-guest-login";
import { useAuthStore } from "../store";
import { FormOtpField } from "./FormOtpField";

interface LoginFormProps {
	hideGuestLogin?: boolean;
}

export const LoginForm = (props: LoginFormProps) => {
	const { hideGuestLogin } = props;
	const { countdown, reset, restart } = useCountdown(59);
	const otpInputRef = useRef<OtpInputRef>(null);

	const { handleGuestLogin } = useGuestLogin();

	const form = useForm({
		resolver: yupResolver(loginSchema),
	});

	const setAuthData = useAuthStore((state) => state.setData);
	const setAuthState = useAuthStore((state) => state.setState);

	const queryClient = useQueryClient();

	const { sendOtp, isOtpSent, resetSentOtp } = useSendOtp(queryClient);
	const { verifyOtpAsync } = useVerifyOtp(queryClient);
	const navigation = useSafeNavigation();

	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	type HandleVerifyOtpPayload = {
		phoneNumber: string;
		code: string;
	};

	const handleVerifyOtp = async (payload: HandleVerifyOtpPayload) => {
		try {
			await verifyOtpAsync(payload, {
				onSuccess(data) {
					if (data.error) {
						console.log(data.error);
						return;
					}
					restart();
					const { id, email, name } = data.data.user;

					setAuthData({ user: { id, email, name, isAnonymous: false } });

					setAuthState("complete");
					navigation.navigate("MainTabs", { screen: "Home" });
				},
			});
		} catch (error) {
			console.log(error);
			Burnt.toast({
				title: "Something Went Wrong",
				preset: "error",
			});
		}
	};

	const handleSubmit = form.handleSubmit(async (data) => {
		if (!isOtpSent) {
			sendOtp(data.phoneNumber.toString());
			return;
		}

		if (isUndefined(data.otp)) {
			form.setError("otp", { message: "OTP is a required field" });
			return;
		}

		const payload = {
			phoneNumber: data.phoneNumber.toString(),
			code: data.otp.toString(),
		};

		handleVerifyOtp(payload);
	});

	const changePhoneNumber = useCallback(() => {
		resetSentOtp();
		reset();
	}, [reset, resetSentOtp]);

	const isResendDisabled = useMemo(() => countdown !== 0, [countdown]);

	return (
		<>
			<FormProvider {...form}>
				<FormField
					name="phoneNumber"
					autoCapitalize="none"
					autoComplete="tel"
					autoCorrect={false}
					status={isOtpSent ? "disabled" : undefined}
					onEndEditing={isOtpSent ? otpInputRef.current?.focus : handleSubmit}
					keyboardType="phone-pad"
					labelTx="loginScreen:phoneFieldLabel"
					placeholder={getFakePhoneNumber()}
				/>

				{isOtpSent && (
					<FormOtpField
						ref={otpInputRef}
						name="otp"
						onFilled={() => handleSubmit()}
					/>
				)}
			</FormProvider>

			{isOtpSent && (
				<View style={{ ...$styles.row, justifyContent: "space-between" }}>
					<Text>00:{countdown}</Text>

					<Button
						text="Resend OTP"
						preset="text"
						//onPress={handleSubmit}
						disabled={isResendDisabled}
						textStyle={{
							color: isResendDisabled
								? colors.palette.neutral500
								: colors.palette.primary500,
						}}
					/>
				</View>
			)}

			{isOtpSent ? (
				<>
					<Button
						testID="verify-otp-button"
						tx="loginScreen:verifyOtp"
						style={themed($tapButton)}
						preset="reversed"
						onPress={handleSubmit}
					/>

					<Button
						text="Change Phone Number"
						style={themed($tapButton)}
						preset="text"
						onPress={changePhoneNumber}
					/>
				</>
			) : (
				<>
					<Button
						testID="send-otp-button"
						tx={isOtpSent ? "loginScreen:verifyOtp" : "loginScreen:sendOtp"}
						style={themed($tapButton)}
						preset="reversed"
						onPress={handleSubmit}
					/>

					{!hideGuestLogin && (
						<Button
							testID="guest-login-button"
							tx="loginScreen:guestLogIn"
							style={themed($tapButton)}
							preset="default"
							onPress={handleGuestLogin}
						/>
					)}
				</>
			)}
		</>
	);
};

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginTop: spacing.xs,
});
