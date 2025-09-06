import { API } from "@/services";
import type { IReqParams, ResourceId } from "@/services/api/types";
import {
	infiniteQueryOptions,
	keepPreviousData,
	queryOptions,
	useMutation,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

function getLessonsOpts(params: IReqParams) {
	return infiniteQueryOptions({
		queryKey: ["LESSON", params] as const,
		queryFn: ({ pageParam, queryKey }) =>
			API.LESSON.GET({ ...pageParam, ...queryKey[1] }),
		initialPageParam: { limit: 10, skip: 0 },
		getNextPageParam: (lastPage, allPages, lastPageParam, allPagesParams) => {
			return undefined;
			const total = allPages[allPages.length - 1].total;
			const totalFetched = allPages.reduce((prev, curr) => {
				return prev + curr.length;
			}, 0);

			return totalFetched < total
				? {
						limit: lastPageParam.limit,
						skip: lastPageParam.skip + lastPageParam.limit,
					}
				: undefined;
		},
		refetchOnWindowFocus: false,
		placeholderData: keepPreviousData,
	});
}

const useGetLessons = (params: IReqParams) => {
	const opts = getLessonsOpts(params);
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	return {
		lessons: data,
		...rest,
	};
};

function getLessonOpts(lessonId: ResourceId) {
	return queryOptions({
		queryKey: ["LESSON", lessonId] as const,
		queryFn: ({ queryKey }) => API.LESSON.ONE(queryKey[1]),
	});
}

const useGetLesson = (lessonId: ResourceId) => {
	const opts = getLessonOpts(lessonId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return {
		lesson: data,
		...rest,
	};
};

const useCreateLesson = () => {
	const id = useId();

	const { mutate, ...rest } = useMutation({
		mutationKey: ["CREATE", "LESSON"],
		mutationFn: API.LESSON.CREATE,
		onMutate: () => {
			toast.loading("Adding New Lesson ...", { id });
		},
		onSuccess: ({ message = "Lesson Added Successfully" }) => {
			toast.success(message, { id });
		},
		onError: ({ message = "Unable to Add Lesson" }) => {
			toast.error(message, { id });
		},
	});

	return {
		createLesson: mutate,
		...rest,
	};
};

export { useGetLessons, useGetLesson, useCreateLesson };
export { getLessonsOpts, getLessonOpts };

//"skip": 0, "limit": 10
//"skip": 10, "limit": 10
//"skip": 20, "limit": 10
//"skip": 30, "limit": 10
