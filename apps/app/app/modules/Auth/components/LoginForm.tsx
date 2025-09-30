import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useSendOtp, useVerifyOtp } from "@safe-fin/ui/hooks";
import { useQueryClient } from "@tanstack/react-query";
import * as Burnt from "burnt";
import { isUndefined } from "lodash";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { ViewStyle } from "react-native";
import { View } from "react-native";
import { Button, Text } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useCountdown } from "@/hooks";
import { loginSchema } from "@/modules/Auth/schema";
import { $styles, colors, type ThemedStyle } from "@/theme";
import { authClient } from "@/utils/auth";
import { useAppTheme } from "@/utils/useAppTheme";
import { useAuthStore } from "../store";

export const LoginForm = () => {
	const { countdown, reset, restart } = useCountdown(59);

	const form = useForm({
		resolver: yupResolver(loginSchema),
	});

	const setAuthData = useAuthStore((state) => state.setData);

	const queryClient = useQueryClient();
	const { sendOtp, isOtpSent, resetSentOtp } = useSendOtp(queryClient);
	const { verifyOtpAsync } = useVerifyOtp(queryClient);
	const { navigate } = useNavigation();

	const { themed } = useAppTheme();

	const handleSubmit = form.handleSubmit(async (data) => {
		console.log(data);
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

		try {
			await verifyOtpAsync(payload);
			authClient.getSession();

			const respData = await authClient.getSession();

			if (isUndefined(respData.data?.user)) {
				throw new Error("User Data can't be `undefined`");
			}
			// biome-ignore assist: Will Fix this Later
			setAuthData({ user: respData.data.user });

			restart();

			navigate("MainTabs", { screen: "Home" });
		} catch (error) {
			console.log(error);
			Burnt.toast({
				title: "Something Went Wrong",
				preset: "error",
			});
		}
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
						keyboardType="number-pad"
						labelTx="loginScreen:otpFieldLabel"
						placeholderTx="loginScreen:otpFieldPlaceholder"
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
