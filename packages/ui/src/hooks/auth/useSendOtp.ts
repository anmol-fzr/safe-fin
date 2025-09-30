import { type QueryClient, useMutation } from "@tanstack/react-query";
import { useResourceActionToast } from "../useResourceActionToast";
import { useAuthClient } from "./useAuthClient";

export const useSendOtp = (queryClient?: QueryClient) => {
	const authClient = useAuthClient();

	const toast = useResourceActionToast();

	const loadingMsg = "Sending OTP ...";
	const successMsg = "OTP Sent Successfully";
	const errorMsg = "Unable to Send OTP";

	const { mutate, isPending, isSuccess, reset, ...rest } = useMutation(
		{
			mutationKey: ["AUTH", "SEND", "OTP"],
			mutationFn(phoneNumber: string) {
				return authClient.phoneNumber.sendOtp({ phoneNumber });
			},
			onMutate() {
				toast.loading(loadingMsg);
			},
			onSuccess() {
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
