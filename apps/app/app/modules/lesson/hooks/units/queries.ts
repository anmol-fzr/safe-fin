import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { ResourceId } from "@/types";
import { COURSES } from "../../api";

function getUnitOpts(unitId: ResourceId) {
	return queryOptions({
		queryKey: ["UNITS", unitId],
		queryFn: () => COURSES.UNITS.ONE(unitId),
	});
}

const useGetUnit = (unitId: ResourceId) => {
	const opts = getUnitOpts(unitId);
	const { data, ...rest } = useSuspenseQuery(opts);
	return { unit: data.data, ...rest };
};

export { getUnitOpts };
export { useGetUnit };
