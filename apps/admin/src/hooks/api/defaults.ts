import {
	infiniteQueryOptions,
	keepPreviousData,
	useQueryClient,
	type DataTag,
	type DefaultError,
	type DefinedInitialDataInfiniteOptions,
	type InfiniteData,
	type QueryKey,
} from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

const initialPageParam = { limit: 10, skip: 0 };
type ToastMessageSet = {
	loadingMsg: string;
	successMsg: string;
	errorMsg: string;
};

const ACTION_DEFINITIONS = {
	createMsg: { loading: "Adding", success: "Added", error: "Add" },
	updateMsg: { loading: "Updating", success: "Updated", error: "Update" },
	deleteMsg: { loading: "Deleting", success: "Deleted", error: "Delete" },
} as const;

type Action = keyof typeof ACTION_DEFINITIONS;

type ToastMessages = {
	[K in Action]: ToastMessageSet;
};

/**
 * Creates a typesafe object of toast messages for a given resource.
 * @param resource The name of the resource (e.g., 'User', 'Task').
 * @returns A fully typed object with messages for each action.
 */
function createToastMessages(resource: string): ToastMessages {
	return (Object.keys(ACTION_DEFINITIONS) as Action[]).reduce(
		(accumulator, action) => {
			const verbs = ACTION_DEFINITIONS[action];

			accumulator[action] = {
				loadingMsg: `${verbs.loading} ${resource}...`,
				successMsg: `${resource} ${verbs.success} Successfully`,
				errorMsg: `Unable to ${verbs.error} ${resource}`,
			};

			return accumulator;
		},
		{} as ToastMessages,
	);
}

const useInvalidateResource = (baseQueryKey: string) => {
	const queryClient = useQueryClient();

	function invalidateResource() {
		queryClient.invalidateQueries({ queryKey: [baseQueryKey] });
	}

	return { invalidateResource };
};

const useResourceActionToast = () => {
	const id = useId();

	return {
		loading: (msg: string) => toast.loading(msg, { id }),
		success: (msg: string) => toast.success(msg, { id }),
		error: (msg: string) => toast.error(msg, { id }),
	};
};

export {
	initialPageParam,
	createToastMessages,
	useInvalidateResource,
	useResourceActionToast,
};
