import { useNavigation } from "@react-navigation/native";
import { useSendOtp } from "@safe-fin/ui/hooks";
import { useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { useCallback, useMemo, useState } from "react";
import { FormProvider } from "react-hook-form";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import { Button, Text } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useCountdown, useYupForm } from "@/hooks";
import { useStores } from "@/models";
import { loginSchema } from "@/schema";
import { $styles, colors, type ThemedStyle } from "@/theme";
import { authClient } from "@/utils/auth";
import { useAppTheme } from "@/utils/useAppTheme";

export const LoginForm = () => {
	const { countdown, reset, restart } = useCountdown(59);
	const form = useYupForm({
		schema: loginSchema,
	});

	const queryClient = useQueryClient();
	const { sendOtp, isOtpSent } = useSendOtp(queryClient);

	const {
		authenticationStore: { setAuthState },
	} = useStores();

	const { themed } = useAppTheme();
	const navigation = useNavigation();

	const handleSubmit = form.handleSubmit(async (data) => {
		if (!isOtpSent) {
			sendOtp(data.phoneNumber);
			return;
		}

		return;
		const vals = form.getValues();
		const phoneNumber = vals.phoneNumber.toString();

		const otpResp = await authClient.phoneNumber.sendOtp({ phoneNumber });
		if (otpResp.error === null) {
			Burnt.toast({
				title: "OTP Sent Successfully",
			});
			restart();
		}
	});

	const login = form.handleSubmit(async (data) => {
		if (isOtpSent) {
			if (!data.otp) {
				form.setError(
					"otp",
					{ message: "Enter a Valid OTP" },
					{ shouldFocus: true },
				);
				return;
			}

			const resp = await authClient.phoneNumber.verify({
				phoneNumber: data.phoneNumber.toString(),
				code: data.otp.toString(),
			});
			if (resp.error === null) {
				if (resp.data.user.phoneNumber === resp.data.user.name) {
					setAuthState("register");
					navigation.navigate("Registration");
					return;
				}
				setAuthState("complete");
			}
			Burnt.toast({
				title: resp.error?.message ?? "Something Went Wrong",
				preset: "error",
			});
			return;
		}

		await handleSubmit();
	});

	const changePhoneNumber = useCallback(() => {
		reset();
	}, [reset]);

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
					keyboardType="phone-pad"
					labelTx="loginScreen:phoneFieldLabel"
					placeholderTx="loginScreen:phoneFieldPlaceholder"
				/>

				{isOtpSent && (
					<FormField
						name="otp"
						autoCapitalize="none"
						autoComplete="sms-otp"
						autoCorrect={false}
						labelTx="loginScreen:otpFieldLabel"
						placeholderTx="loginScreen:otpFieldPlaceholder"
						onSubmitEditing={login}
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

			<Button
				testID="login-button"
				tx={isOtpSent ? "loginScreen:verifyOtp" : "loginScreen:sendOtp"}
				style={themed($tapButton)}
				preset="reversed"
				onPress={handleSubmit}
			/>

			{isOtpSent && (
				<Button
					text="Change Phone Number"
					style={themed($tapButton)}
					preset="text"
					onPress={changePhoneNumber}
				/>
			)}
		</>
	);
};

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginTop: spacing.xs,
});
