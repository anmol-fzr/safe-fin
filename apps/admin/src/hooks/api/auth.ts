import { createAuthHooks } from "@daveyplate/better-auth-tanstack";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth";
import { useResourceActionToast } from "./defaults";

const useSendOtp = () => {
	const toast = useResourceActionToast();

	const loadingMsg = "Sending OTP ...";
	const successMsg = "OTP Sent Successfully";
	const errorMsg = "Unable to Send OTP";

	const { mutate, isPending, isSuccess, reset, ...rest } = useMutation({
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
	});

	return {
		sendOtp: mutate,
		isOtpSent: isSuccess,
		resetSentOtp: reset,
		isSendingOtp: isPending,
		...rest,
	};
};

type IVerifyOtp = {
	phoneNumber: string;
	code: string;
};

const useVerifyOtp = () => {
	const toast = useResourceActionToast();

	const loadingMsg = "Verifying OTP ...";
	const successMsg = "OTP Verified Successfully";
	const errorMsg = "Unable to Verify OTP";

	const { mutate, isPending, mutateAsync, isError, error, ...rest } =
		useMutation({
			mutationKey: ["AUTH", "VERIFY", "OTP"],
			mutationFn(payload: IVerifyOtp) {
				return authClient.phoneNumber.verify(payload);
			},
			onMutate() {
				toast.loading(loadingMsg);
			},
			onSuccess(data) {
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
		});

	return {
		verifyOtp: mutate,
		verifyOtpAsync: mutateAsync,
		isVerifyingOtp: isPending,
		isVerifyOtpError: isError,
		verifyOtpError: error,
		...rest,
	};
};

export { useSendOtp, useVerifyOtp };

export const {
	useSession,
	usePrefetchSession,
	useToken,
	useListAccounts,
	useListSessions,
	useListDeviceSessions,
	useListPasskeys,
	useUpdateUser,
	useUnlinkAccount,
	useRevokeOtherSessions,
	useRevokeSession,
	useRevokeSessions,
	useSetActiveSession,
	useRevokeDeviceSession,
	useDeletePasskey,
	useAuthQuery,
	useAuthMutation,
} = createAuthHooks(authClient);
