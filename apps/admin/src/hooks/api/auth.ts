import { authClient } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import { createAuthHooks } from "@daveyplate/better-auth-tanstack";

const useSendOtp = () => {
	const { mutate, isPending, ...rest } = useMutation({
		mutationKey: ["AUTH", "SEND", "OTP"],
		mutationFn: (phoneNumber: number) =>
			authClient.phoneNumber.sendOtp({ phoneNumber }),
	});

	return { sendOtp: mutate, isSendingOtp: isPending, ...rest };
};

type IVerifyOtp = {
	phoneNumber: string;
	code: string;
};

const useVerifyOtp = () => {
	const { mutate, isPending, ...rest } = useMutation({
		mutationKey: ["AUTH", "VERIFY", "OTP"],
		mutationFn: (payload: IVerifyOtp) => authClient.phoneNumber.verify(payload),
	});

	return { verifyOtp: mutate, isVerifyingOtp: isPending, ...rest };
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
