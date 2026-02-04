import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useResourceActionToast } from "@safe-fin/ui/hooks";
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
			mutationFn(email: string) {
				return authClient.emailOtp.sendVerificationOtp({
					email,
					type: "sign-in",
				});

				try {
					const { data, error } = authClient.emailOtp.sendVerificationOtp({
						email,
						type: "sign-in",
					});
					return data;
					if (error) {
						throw new Error("Unable to Send Email OTP", { cause: error });
					}
				} catch (error) {
					throw new Error("Unable to Send Email OTP", { cause: error });
				}
			},
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
