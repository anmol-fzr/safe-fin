import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner-native";
import { authClient } from "../utils";

export const useSendOtp = () => {
	const loadingMsg = "Sending OTP ...";
	const successMsg = "OTP Sent Successfully";
	const errorMsg = "Unable to Send OTP";

	const { mutate, isPending, isSuccess, reset, ...rest } = useMutation({
		mutationKey: ["AUTH", "SEND", "OTP"],
		mutationFn: (email: string) =>
			authClient.emailOtp.sendVerificationOtp({
				email,
				type: "sign-in",
			}),
		onMutate() {
			console.info("Sending User Login OTP ...");
			toast.loading(loadingMsg);
		},
		onSuccess() {
			console.info("User Login OTP Sent Successfully");
			toast.success(successMsg);
		},
		onError(err) {
			console.info("User Login OTP Errored", err ?? errorMsg);
			toast.error(err.message ?? errorMsg);
		},
	});

	return {
		sendOtp: mutate,
		isOtpSent: isSuccess,
		resetSentOtp: reset,
		isSendingOtp: isPending,
		...rest,
	};
};
