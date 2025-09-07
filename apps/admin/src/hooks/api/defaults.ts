import { useQueryClient } from "@tanstack/react-query";

const initialPageParam = { limit: 10, skip: 0 };

const useInvalidateResource = (baseQueryKey: string) => {
	const queryClient = useQueryClient();

	function invalidateResource() {
		queryClient.invalidateQueries({ queryKey: [baseQueryKey] });
	}

	return { invalidateResource };
};

export { initialPageParam, useInvalidateResource };
