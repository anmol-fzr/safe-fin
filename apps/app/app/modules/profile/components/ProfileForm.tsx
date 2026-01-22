import { FormProvider } from "react-hook-form";
import { Button } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useYupForm } from "@/hooks";
import { profileSchema } from "@/modules/auth/schema";
import { authClient } from "@/modules/auth/utils";
import { auth } from "@safe-fin/auth/server";
import { useUpdateUser } from "@/modules/auth/hooks/useUpdateUser";

export const ProfileForm = () => {
	const methods = useYupForm({
		schema: profileSchema,
		defaultValues: async () => {
			try {
				const { data } = await authClient.getSession();
				if (data !== null) {
					return {
						name: data?.user?.name ?? "",
						phoneNumber: data?.user?.phoneNumber ?? "",
					};
				}
			} catch (err) {
				console.error("Error: Fetching Data for User profile, ", err);
			} finally {
				return {
					name: "",
					phoneNumber: "",
				};
			}
		},
	});

	const { updateUser, isUpdatingUser } = useUpdateUser();

	const onSubmit = methods.handleSubmit((data) => {
		updateUser({
			name: data.name,
		});
	});

	//const { getValues } = methods;

	// async function sendOtp() {
	// 	const { phoneNumber } = getValues();
	// 	const isOtpSent = await authClient.phoneNumber.sendOtp({
	// 		phoneNumber: phoneNumber.toString(),
	// 	});
	// 	if (isOtpSent.error === null) {
	// 		console.log(isOtpSent.data.message);
	// 		setPhoneOtpState("sent");
	// 	}
	// }

	// async function verifyOtp() {
	// 	const { phoneNumber, otp } = getValues();
	// 	if (!otp) {
	// 		return;
	// 	}
	// 	const isOtpVerified = await authClient.phoneNumber.verify({
	// 		phoneNumber: phoneNumber.toString(),
	// 		code: otp.toString(),
	// 		updatePhoneNumber: true,
	// 	});
	// 	if (isOtpVerified.error === null) {
	// 		console.log(isOtpVerified.data);
	// 		setPhoneOtpState("verified");
	// 	}
	// }

	return (
		<FormProvider {...methods}>
			<FormField name="name" label="Name" placeholder="Anmol" />
			{/*
				<FormField
					name="email"
					label="Email"
					placeholder="anmol@withanmol.com"
				/>
        */}
			<FormField
				name="phoneNumber"
				label="Phone Number"
				placeholder="8427822949"
				status="disabled"
			/>

			{/*
				{["open", "verified"].includes(phoneOtpState) && (
					<FormField
						name="otp"
						autoCapitalize="none"
						autoComplete="sms-otp"
						autoCorrect={false}
						labelTx="loginScreen:otpFieldLabel"
						placeholderTx="loginScreen:otpFieldPlaceholder"
						RightAccessory={() => (
							<Button
								preset="text"
								style={{
									marginTop: "auto",
									marginRight: spacing.sm,
									marginBottom: "auto",
								}}
								onPress={() => setPhoneOtpState("closed")}
							>
								Verify OTP
							</Button>
						)}
					/>
				)}
        */}
			<Button
				preset="reversed"
				status={isUpdatingUser ? "loading" : undefined}
				onPress={onSubmit}
			>
				Update
			</Button>
		</FormProvider>
	);
};
