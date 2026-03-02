import { useResourceActionToast } from "@safe-fin/ui/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "../utils";

export const useSendOtp = () => {
	const queryClient = useQueryClient();

	const toast = useResourceActionToast();

	const loadingMsg = "Sending OTP ...";
	const successMsg = "OTP Sent Successfully";
	const errorMsg = "Unable to Send OTP";

	const { mutate, isPending, isSuccess, reset, ...rest } = useMutation(
		{
			mutationKey: ["AUTH", "SEND", "OTP"],
			mutationFn: (email: string) =>
				authClient.emailOtp.sendVerificationOtp({
					email,
					type: "sign-in",
				}),
			onMutate() {
				toast.loading(loadingMsg);
			},
			onSuccess() {
				console.info("User Login OTP Sent Successfully");
				toast.success(successMsg);
			},
			onError({ message = errorMsg }) {
				toast.error(message);
			},
		},
		queryClient,
	);

	return {
		sendOtp: mutate,
		isOtpSent: isSuccess,
		resetSentOtp: reset,
		isSendingOtp: isPending,
		...rest,
	};
};
