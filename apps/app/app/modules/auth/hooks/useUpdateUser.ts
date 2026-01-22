import { useAuthClient, useResourceActionToast } from "@safe-fin/ui/hooks";
import { useMutation } from "@tanstack/react-query";

type UpdateUserFnPayload = {
	name: string;
	//gender: string;
};

export const useUpdateUser = () => {
	const authClient = useAuthClient();

	const toast = useResourceActionToast();

	const { mutate, isPending, ...rest } = useMutation({
		mutationKey: ["USER", "UPDATE"],
		mutationFn(payload: UpdateUserFnPayload) {
			return authClient.updateUser(payload);
		},
		onMutate() {
			toast.loading("Updating User Profile ...");
		},
		onSuccess() {
			toast.success("User Profile Updated Successfully");
		},
		onError() {
			toast.error("Unable to Update User Profile");
		},
	});

	return {
		updateUser: mutate,
		isUpdatingUser: isPending,
		...rest,
	};
};
