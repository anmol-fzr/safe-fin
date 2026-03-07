import { useInterval, useSafeContext } from "@safe-fin/ui/hooks";
import { useRouter } from "expo-router";
import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useState,
} from "react";
import {
	Controller,
	FormProvider,
	useForm,
	useFormContext,
} from "react-hook-form";
import { Pressable, type ViewStyle } from "react-native";
import {
	TextInputOTP,
	TextInputOTPGroup,
	TextInputOTPSlot,
} from "react-native-input-code-otp";
import { Button, Text } from "@/components";
import { getEmptyArr } from "@/pkg/ui";
import { spacing, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useSendOtp } from "../hooks/useSendOtp";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { setAuthData } from "../store";
import { LoginForm } from "./LoginForm";

interface VerifyFormContextType {
	handleSubmit: VoidFunction;
	isVerifyingOtp: boolean;
	email: string;
}

const VerifyFormContext = createContext<VerifyFormContextType | null>(null);

const useVerifyFormContext = () => {
	return useSafeContext(
		VerifyFormContext,
		"useVerifyFormContext must be used within VerifyForm.Root",
	);
};

interface VerifyFormRootProps extends PropsWithChildren {
	email: string;
}

const VerifyFormRoot = ({ children, email }: VerifyFormRootProps) => {
	const form = useForm();

	const { verifyOtp, isVerifyingOtp } = useVerifyOtp();

	const router = useRouter();
	const handleSubmit = form.handleSubmit(async (data) => {
		const { otp } = data;

		verifyOtp(
			{
				email,
				otp,
			},
			{
				onSuccess: (data) => {
					if (data.error === null) {
						setAuthData({ user: data?.data?.user as any });
						router.replace("/tabs/home");
					}
				},
			},
		);

		console.log({ data });
	});

	const value = {
		handleSubmit,
		isVerifyingOtp,
		email,
	};

	return (
		<VerifyFormContext.Provider value={value}>
			<FormProvider {...form}>{children}</FormProvider>
		</VerifyFormContext.Provider>
	);
};

const SubmitButton = () => {
	const { isVerifyingOtp, handleSubmit } = useVerifyFormContext();
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<Button
			style={themed($actionBtn)}
			preset="reversed"
			onPress={handleSubmit}
			status={isVerifyingOtp ? "loading" : undefined}
			loadingText="Verifying OTP ..."
		>
			<Text
				preset="subheading"
				style={{ color: colors.textInverse }}
				tx="loginScreen:verifyOtp"
			/>
		</Button>
	);
};

const OtpField = () => {
	const {
		theme: { colors },
	} = useAppTheme();

	const { control } = useFormContext();
	const { handleSubmit } = useVerifyFormContext();

	return (
		<Controller
			name="otp"
			control={control}
			render={({ field: { onChange, value, onBlur } }) => (
				<TextInputOTP
					value={value}
					onChangeText={onChange}
					maxLength={6}
					onBlur={onBlur}
					caretColor={colors.tint}
					onFilled={handleSubmit}
				>
					<TextInputOTPGroup>
						{getEmptyArr(6).map((_, i) => (
							<TextInputOTPSlot
								key={i}
								index={i}
								focusedSlotStyles={{
									borderColor: colors.tint,
								}}
								slotTextStyles={{
									color: colors.text,
								}}
							/>
						))}
					</TextInputOTPGroup>
				</TextInputOTP>
			)}
		/>
	);
};

const OtpFieldInfo = () => {
	const {
		theme: { colors },
	} = useAppTheme();
	const { email } = useVerifyFormContext();

	const { timer, reStartTimer } = useTimer();

	const { sendOtp } = useSendOtp();

	const handleResendOtp = useCallback(() => {
		sendOtp(email, {
			onSuccess: () => {
				reStartTimer();
			},
		});
	}, [sendOtp, email]);

	const min = Math.floor(timer / 60).toString();
	//const minPart = padZerosByLength(min, 2);

	const sec = Number(timer % 60).toString();

	return (
		<Text
			preset="default"
			size="xs"
			style={{
				textAlign: "center",
				color: colors.textDim,
				marginTop: spacing.sm,
			}}
		>
			You didn't received any code ?
			{timer > 0 ? (
				<Text
					preset="default"
					size="xs"
					style={{
						textAlign: "center",
						color: colors.textDim,
						marginTop: spacing.sm,
					}}
				>
					{" "}
					Resend in {min}:{sec}
				</Text>
			) : (
				<Pressable style={{ height: 16 }} onPress={handleResendOtp}>
					<Text style={{ color: colors.tint }} preset="default" size="xs">
						{" "}
						Resend Code
					</Text>
				</Pressable>
			)}
		</Text>
	);
};

const useTimer = (seconds = 119) => {
	const [count, setCount] = useState(seconds);

	useInterval(() => {
		if (count > 0) {
			setCount((count) => count - 1);
		}
	}, 1000);

	const reStartTimer = () => {
		setCount(seconds);
	};

	return { timer: count, reStartTimer };
};

export const VerifyForm = Object.assign(VerifyFormRoot, {
	Root: VerifyFormRoot,
	Otp: OtpField,
	OtpInfo: OtpFieldInfo,
	Submit: SubmitButton,
	Actions: LoginForm.Actions,
	//GuestVerify: GuestVerifyButton,
	//ChangeNumber: ChangeNumberButton,
});

const $actionBtn: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
	//margin: spacing.lg,
	borderRadius: spacing.xl,
	borderWidth: 0,
	backgroundColor: colors.tint,
});
