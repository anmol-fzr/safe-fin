import { useId } from "react";
import { useNotifier } from "./useNotifier";

export const useResourceActionToast = () => {
	const toast = useNotifier();
	const id = useId();

	return {
		loading: (msg: string) => toast.loading(msg, { id }),
		success: (msg: string) => toast.success(msg, { id }),
		error: (msg: string) => toast.error(msg, { id }),
	};
};
