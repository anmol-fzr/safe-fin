import {
	mutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { authClient } from "@/modules/auth/utils";
import { DEMO_GRAPHICS } from "../api";
import { getListSessionsOpts } from "./queries";

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

export { useUpdateDemoGraphics, useRevokeSession };
