import { useAuthClient, useResourceActionToast } from "@safe-fin/ui/hooks";
import { useMutation } from "@tanstack/react-query";

type UpdateUserFnPayload = {
	name: string;
	gender: string;
};

export const useUpdateUser = () => {
	const authClient = useAuthClient();

	const toast = useResourceActionToast();

	const { mutate, isPending, ...rest } = useMutation({
		mutationKey: ["USER", "UPDATE"],
		mutationFn(payload: UpdateUserFnPayload) {
			return authClient.updateUser(payload);
		},
		onError() {
			toast.error("Something Went Wrong");
		},
	});

	return {
		updateUser: mutate,
		isUpdatingUser: isPending,
		...rest,
	};
};
