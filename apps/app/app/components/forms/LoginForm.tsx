import { useCallback, useMemo, useState } from "react";
import type { ViewStyle } from "react-native";
import { Button, Text } from "@/components";
import { View } from "react-native";
import { $styles, colors, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { authClient } from "@/utils/auth";
import { useStores } from "@/models";
import { FormProvider } from "react-hook-form";
import { FormField } from "@/components/form/FormField";
import { loginSchema } from "@/schema";
import { useNavigation } from "@react-navigation/native";
import { useYupForm, useCountdown } from "@/hooks";
import * as Burnt from "burnt";

export const LoginForm = () => {
	const { countdown, reset, restart } = useCountdown(59);
	const form = useYupForm({
		schema: loginSchema,
	});

	const { handleSubmit, getValues, setError } = form;

	const [isOtpSent, setIsOtpSent] = useState(false);

	const {
		authenticationStore: { setAuthState },
	} = useStores();

	const { themed } = useAppTheme();
	const navigation = useNavigation();

	const sendOtp = useCallback(async () => {
		const vals = getValues();
		const phoneNumber = vals.phoneNumber.toString();
		if (
			!phoneNumber ||
			phoneNumber.length !== 10 ||
			isNaN(Number(phoneNumber))
		) {
			setError(
				"phoneNumber",
				{ message: "Enter a Valid Phone Number" },
				{ shouldFocus: true },
			);
			return;
		}

		const otpResp = await authClient.phoneNumber.sendOtp({ phoneNumber });
		if (otpResp.error === null) {
			Burnt.toast({
				title: "OTP Sent Successfully",
			});
			restart();
			setIsOtpSent(true);
		}
	}, [getValues, setError]);

	const login = handleSubmit(async (data) => {
		if (isOtpSent) {
			if (!data.otp) {
				setError(
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
				title: resp.error?.message,
				preset: "error",
			});
			return;
		}
		await sendOtp();
	});

	const changePhoneNumber = useCallback(() => {
		reset();
		setIsOtpSent(false);
	}, [reset]);

	const isResendDisabled = useMemo(() => countdown !== 0, [countdown === 0]);

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
						onPress={sendOtp}
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
				onPress={login}
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
