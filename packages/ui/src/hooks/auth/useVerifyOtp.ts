import {
	type QueryClient,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useResourceActionToast } from "../useResourceActionToast";
import { useAuthClient } from "./useAuthClient";

type IVerifyOtp = {
	phoneNumber: string;
	code: string;
};

export const useVerifyOtp = (queryClient?: QueryClient) => {
	queryClient ??= useQueryClient();

	const authClient = useAuthClient();
	const toast = useResourceActionToast();

	const loadingMsg = "Verifying OTP ...";
	const successMsg = "OTP Verified Successfully";
	const errorMsg = "Unable to Verify OTP";

	const { mutate, isPending, mutateAsync, isError, error, ...rest } =
		useMutation(
			{
				mutationKey: ["AUTH", "VERIFY", "OTP"],
				mutationFn(payload: IVerifyOtp) {
					return authClient.phoneNumber.verify(payload);
				},
				onMutate() {
					toast.loading(loadingMsg);
				},
				onSuccess(data) {
					console.log(data);
					if (data.data === null) {
						toast.error(data.error.message ?? errorMsg);
						return;
					}
					toast.success(successMsg);
				},
				onError(data) {
					console.log(data);
					toast.error(data.message ?? errorMsg);
				},
			},
			queryClient,
		);

	return {
		verifyOtp: mutate,
		verifyOtpAsync: mutateAsync,
		isVerifyingOtp: isPending,
		isVerifyOtpError: isError,
		verifyOtpError: error,
		...rest,
	};
};
