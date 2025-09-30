import { createAuthHooks } from "@daveyplate/better-auth-tanstack";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth";
import { useResourceActionToast } from "./defaults";

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

export { useVerifyOtp };

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
