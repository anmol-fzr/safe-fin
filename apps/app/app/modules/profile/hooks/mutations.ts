import { useResourceActionToast } from "@safe-fin/ui/hooks";
import * as Sentry from "@sentry/react-native";
import {
	mutationOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { produce } from "immer";
import { cache, useId } from "react";
import { useOptimisticUpdateHelper } from "@/hooks/useOptimisticUpdateHelper";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useAuthStore } from "@/modules/auth/store";
import { authClient } from "@/modules/auth/utils";
import { DEMO_GRAPHICS, PROFILE } from "../api";
import { getListSessionsOpts, getPublicProfileOpts } from "./queries";

const useUpdateDemoGraphics = () => {
	const toast = useResourceActionToast();

	const loadingMsg = "Updating Profile ...";
	const successMsg = "Profile Updated Successfully";
	const errorMsg = "Unable to Update Profile";

	const { mutate, ...rest } = useMutation({
		mutationKey: ["UPDATE", "DEMO-GRAPHICS"],
		mutationFn: DEMO_GRAPHICS.UPDATE,
		onMutate() {
			toast.loading(loadingMsg);
		},
		onSuccess(data) {
			console.log(data);
			if (data.data === null) {
				toast.error(data?.message ?? errorMsg);
				return;
			}
			toast.success(data?.message ?? successMsg);
		},
		onError(data) {
			console.log(data);
			toast.error(data.message ?? errorMsg);
		},
	});

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

const useSubmitFeedback = () => {
	const toast = useResourceActionToast();
	const userId = useAuthStore((state) => state?.user?.id ?? "");

	const { mutate, isPending, ...rest } = useMutation({
		mutationFn: (message: string) => {
			Sentry.captureFeedback(
				{ message },
				{
					captureContext: {
						tags: {
							userId,
						},
					},
				},
			);
		},
		onMutate() {
			toast.loading("Submitting ...");
		},
		onSuccess() {
			toast.success("Feedback Submitted");
		},
		onError(err) {
			console.log(err);
			toast.error("Unable to Submit Feedback");
		},
	});

	return { submitFeedback: mutate, isSubmittingFeedback: isPending, ...rest };
};

const useAddProfileLink = () => {
	const { queryKey } = getPublicProfileOpts();
	const insertedId = useId();

	const { getCacheOperator } = useOptimisticUpdateHelper();

	const cacheOperator = getCacheOperator(queryKey);

	const { mutate, ...rest } = useMutation({
		mutationKey: ["PROFILE", "LINK", "ADD"],
		mutationFn: PROFILE.LINK.ADD,
		onMutate: async (payload) => {
			const profile = cacheOperator.get();

			if (profile === undefined) {
				return {
					prevData: null,
					newData: null,
				} as const;
			}

			const newProfile = produce(profile, (draftProfile) => {
				draftProfile.data.user.links.unshift({
					id: insertedId,
					link: payload.link,
				});
			});

			cacheOperator.set(newProfile);

			return {
				prevData: profile,
				newData: newProfile,
				meta: {
					insertedId,
				},
			} as const;
		},
		onSuccess: async (data, _variables, onMutateResult) => {
			const { newData } = onMutateResult;

			if (newData === null) {
				return;
			}

			const fix = produce(newData, (profile) => {
				const foundLink = profile.data.user.links.find(
					(link) => link.id === onMutateResult.meta.insertedId,
				);
				if (foundLink) {
					foundLink.id = data.data.id;
				}
			});

			cacheOperator.set(fix);
		},
		onError: (err, payload, onMutateResult) => {
			if (err) {
				console.error(err);
			}

			if (!onMutateResult?.prevData) {
				console.info("Optimistic rollback failed: missing data", {
					payload,
					queryKey,
				});

				return;
			}

			cacheOperator.set(onMutateResult.prevData);
		},
	});

	return { addProfileLink: mutate, ...rest };
};

const useRemoveProfileLink = () => {
	const { queryKey } = getPublicProfileOpts();

	const { getCacheOperator } = useOptimisticUpdateHelper();

	const cacheOperator = getCacheOperator(queryKey);

	const { mutate, ...rest } = useMutation({
		mutationKey: ["PROFILE", "LINK", "REMOVE"],
		mutationFn: PROFILE.LINK.REMOVE,
		onMutate: async (payload) => {
			const linkId = payload;
			const profile = cacheOperator.get();

			if (profile === undefined) {
				return {
					prevData: null,
					newData: null,
				} as const;
			}

			const newProfile = produce(profile, (draftProfile) => {
				const newLinks = draftProfile.data.user.links.filter(
					(link) => link.id !== linkId,
				);
				draftProfile.data.user.links = newLinks;
			});

			cacheOperator.set(newProfile);

			return {
				prevData: profile,
				newData: newProfile,
				meta: {
					removedId: linkId,
				},
			} as const;
		},
		onError: (err, payload, onMutateResult) => {
			if (err) {
				console.error(err);
			}

			if (!onMutateResult?.prevData) {
				console.info("Optimistic rollback failed: missing data", {
					payload,
					queryKey,
				});

				return;
			}

			cacheOperator.set(onMutateResult.prevData);
		},
	});

	return { removeProfileLink: mutate, ...rest };
};

export {
	useUpdateDemoGraphics,
	useRevokeSession,
	useRevokeOtherSessions,
	useDeleteAccount,
	useSubmitFeedback,
};

export { useAddProfileLink, useRemoveProfileLink };
