import { API } from "@/services";
import type { IReqParams, ResourceId } from "@/services/api/types";
import {
	infiniteQueryOptions,
	keepPreviousData,
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";
import { initialPageParam, useInvalidateResource } from "./defaults";

const baseQueryKey = "LESSON";

function getLessonsOpts(params: IReqParams) {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey, params] as const,
		queryFn: ({ pageParam, queryKey }) =>
			API.LESSON.GET({ ...pageParam, ...queryKey[1] }),
		initialPageParam,
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
		queryKey: [baseQueryKey, lessonId] as const,
		queryFn: ({ queryKey }) => API.LESSON.ONE(queryKey[1]),
	});
}

const useGetLesson = (lessonId: ResourceId) => {
	// return {
	// 	lesson: ,
	// };
	const opts = getLessonOpts(lessonId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return {
		lesson: data,
		...rest,
	};
};

const useCreateLesson = () => {
	const id = useId();
	const { invalidateLessons } = useInvalidateLessons();

	const { mutate, ...rest } = useMutation({
		mutationKey: ["CREATE", baseQueryKey],
		mutationFn: API.LESSON.CREATE,
		onMutate: () => {
			toast.loading("Adding New Lesson ...", { id });
		},
		onSuccess: ({ message = "Lesson Added Successfully" }) => {
			toast.success(message, { id });
			invalidateLessons();
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

const useDeleteLesson = () => {
	const id = useId();
	const { invalidateLessons } = useInvalidateLessons();

	const { mutate, ...rest } = useMutation({
		mutationKey: ["DELETE", baseQueryKey],
		mutationFn: API.LESSON.DELETE,
		onMutate: () => {
			toast.loading("Deleting New Lesson ...", { id });
		},
		onSuccess: ({ message = "Lesson Deleted Successfully" }) => {
			toast.success(message, { id });
			invalidateLessons();
		},
		onError: ({ message = "Unable to Delete Lesson" }) => {
			toast.error(message, { id });
		},
	});

	return {
		deleteLesson: mutate,
		...rest,
	};
};

export { useGetLessons, useGetLesson, useCreateLesson, useDeleteLesson };
export { getLessonsOpts, getLessonOpts };

const useInvalidateLessons = () => {
	const { invalidateResource } = useInvalidateResource(baseQueryKey);

	return { invalidateLessons: invalidateResource };
};
