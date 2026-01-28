import {
	infiniteQueryOptions,
	queryOptions,
	useMutation,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import {
	createToastMessages,
	initialPageParam,
	useInvalidateResource,
	useResourceActionToast,
} from "@/hooks/api/defaults";
import type { ICreateLessonReq } from "@/services/api";
import type { IReqParams, ResourceId } from "@/services/api/types";
import { COURSES, UNITS } from "../api";

const baseQueryKey = "COURSES";
const { createMsg, updateMsg, deleteMsg } = createToastMessages("Lesson");

//function getCoursesOpts(params: IReqParams) {
function getCoursesOpts() {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey] as const,
		queryFn: COURSES.ALL,
		initialPageParam,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			const total = allPages[allPages.length - 1].paginate.total;
			const totalFetched = allPages.reduce((prev, curr) => {
				return prev + curr.data.length;
			}, 0);

			return totalFetched < total
				? {
						limit: lastPageParam.limit,
						skip: lastPageParam.skip + lastPageParam.limit,
					}
				: undefined;
		},
	});
}

const useGetCourses = () => {
	const opts = getCoursesOpts();
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	return {
		courses: data,
		...rest,
	};
};

function getCourseOpts(courseId: ResourceId) {
	return queryOptions({
		queryKey: [baseQueryKey, courseId] as const,
		queryFn: ({ queryKey }) => COURSES.ONE(queryKey[1]),
	});
}

const useGetCourse = (courseId: ResourceId) => {
	const opts = getCourseOpts(courseId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return {
		course: data.data,
		...rest,
	};
};

function getUnitOpts(unitId: ResourceId) {
	return queryOptions({
		queryKey: ["UNITS", unitId] as const,
		queryFn: ({ queryKey }) => UNITS.ONE(queryKey[1]),
	});
}

const useGetUnit = (unitId: ResourceId) => {
	const opts = getUnitOpts(unitId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return { unit: data, ...rest };
};

export { getCoursesOpts, getCourseOpts };
export { useGetCourses, useGetCourse };

export { getUnitOpts };
export { useGetUnit };
