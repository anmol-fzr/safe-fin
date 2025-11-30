import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import {
	OtpInput,
	type OtpInputProps,
	type OtpInputRef,
} from "react-native-otp-entry";
import { useAppTheme } from "@/utils/useAppTheme";

interface FormOtpFieldProps extends OtpInputProps {
	name: string;
}

export const FormOtpField = forwardRef<OtpInputRef, FormOtpFieldProps>(
	(props, ref) => {
		const { name, ...rest } = props;

		const {
			theme: { colors },
		} = useAppTheme();

		return (
			<Controller
				name={name}
				render={({ field }) => (
					<OtpInput
						ref={ref}
						numberOfDigits={6}
						focusColor="green"
						onTextChange={(value) => field.onChange(value)}
						onBlur={field.onBlur}
						disabled={field.disabled}
						hideStick={true}
						placeholder="******"
						blurOnFilled
						type="numeric"
						secureTextEntry={false}
						focusStickBlinkingDuration={500}
						textInputProps={{
							accessibilityLabel: "One-Time Password",
						}}
						textProps={{
							accessibilityRole: "text",
							accessibilityLabel: "OTP digit",
							allowFontScaling: false,
						}}
						theme={{
							focusedPinCodeContainerStyle: {
								borderColor: colors.palette.accent500,
							},
						}}
						{...rest}
					/>
				)}
			/>
		);
	},
);
