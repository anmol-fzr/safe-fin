import { useSuspenseQuery } from "@tanstack/react-query";
import { HOME } from "../api";

export const useHomeUI = () => {
	const { data, ...rest } = useSuspenseQuery({
		queryKey: ["HOME", "UI"],
		queryFn: HOME.UI,
		staleTime: 86400,
	});

	return {
		data,
		...rest,
	};
};
