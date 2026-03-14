import {
	queryOptions,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import type { ResourceId } from "@/types";
import { COURSES } from "../../api";

function getUnitOpts(unitId: ResourceId) {
	return queryOptions({
		queryKey: ["UNITS", unitId],
		queryFn: () => COURSES.UNITS.ONE(unitId),
	});
}

const usePrefetchUnit = () => {
	const queryClient = useQueryClient();

	function prefetchUnit(unitId: ResourceId) {
		queryClient.prefetchQuery(getUnitOpts(unitId));
	}

	return { prefetchUnit };
};

const useGetUnit = (unitId: ResourceId) => {
	const opts = getUnitOpts(unitId);
	const { data, ...rest } = useSuspenseQuery(opts);
	return { unit: data.data, ...rest };
};

export { getUnitOpts };
export { useGetUnit, usePrefetchUnit };
