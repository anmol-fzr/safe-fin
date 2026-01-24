import {
	mutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@/modules/auth/utils";
import { DEMO_GRAPHICS } from "../api";
import { getListSessionsOpts } from "./queries";
import { useAuth } from "@/modules/auth/hooks/useAuth";

const getUpdateDemoGraphicsOpts = () => {
	return mutationOptions({
		mutationKey: ["UPDATE", "DEMO-GRAPHICS"],
		mutationFn: DEMO_GRAPHICS.UPDATE,
	});
};

const useUpdateDemoGraphics = () => {
	const opts = getUpdateDemoGraphicsOpts();
	const { mutate, ...rest } = useMutation(opts);
	return {
		updateDemoGraphics: mutate,
		...rest,
	};
};

const useRevokeSession = () => {
	const queryClient = useQueryClient();

	const { mutate, isPending, ...rest } = useMutation({
		mutationKey: ["AUTH", "REVOKE", "SESSION"],
		mutationFn: (token: string) => authClient.revokeSession({ token }),
		onSuccess: () => {
			const opts = getListSessionsOpts();
			queryClient.invalidateQueries(opts);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return { revokeSession: mutate, isRevokingSession: isPending, ...rest };
};

const useRevokeOtherSessions = () => {
	const queryClient = useQueryClient();

	const { mutate, ...rest } = useMutation({
		mutationKey: ["AUTH", "REVOKE", "OTHER", "SESSION"],
		mutationFn: () => authClient.revokeOtherSessions(),
		onSuccess: () => {
			const opts = getListSessionsOpts();
			queryClient.invalidateQueries(opts);
		},
	});

	return { revokeOtherSessions: mutate, ...rest };
};

const useDeleteAccount = () => {
	const { handleLogout } = useAuth();

	const { mutate, ...rest } = useMutation({
		mutationKey: ["AUTH", "REVOKE", "OTHER", "SESSION"],
		mutationFn: () => authClient.deleteUser(),
		onSuccess: () => {
			handleLogout();
		},
	});

	return { deleteAccount: mutate, ...rest };
};

export {
	useUpdateDemoGraphics,
	useRevokeSession,
	useRevokeOtherSessions,
	useDeleteAccount,
};
