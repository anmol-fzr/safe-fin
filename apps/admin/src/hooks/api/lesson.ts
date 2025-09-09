import { API } from "@/services";
import type { IReqParams, ResourceId } from "@/services/api/types";
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
} from "./defaults";
import { type ICreateLessonReq } from "@/services/api";

const baseQueryKey = "LESSON";
const { createMsg, updateMsg, deleteMsg } = createToastMessages("Lesson");

function getLessonsOpts(params: IReqParams) {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey, params] as const,
		queryFn: ({ pageParam, queryKey }) =>
			API.LESSON.GET({ ...pageParam, ...queryKey[1] }),
		initialPageParam,
		getNextPageParam: (lastPage, allPages, lastPageParam, allPagesParams) => {
			const total = allPages[allPages.length - 1].total;
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
	const opts = getLessonOpts(lessonId);
	const { data, ...rest } = useSuspenseQuery(opts);

	return {
		lesson: data,
		...rest,
	};
};

const useCreateLesson = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = createMsg;

	const { mutate, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "CREATE"],
		mutationFn: API.LESSON.CREATE,
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: ({ message = successMsg }) => {
			toast.success(message);
			invalidateLessons();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		createLesson: mutate,
		...rest,
	};
};

const useDeleteLesson = () => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = deleteMsg;

	const { mutate, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "DELETE"],
		mutationFn: API.LESSON.DELETE,
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: ({ message = successMsg }) => {
			toast.success(message);
			invalidateLessons();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		deleteLesson: mutate,
		...rest,
	};
};

const useUpdateLesson = (lessonId: ResourceId) => {
	const toast = useResourceActionToast();
	const { invalidateLessons } = useInvalidateLessons();

	const { loadingMsg, successMsg, errorMsg } = updateMsg;

	const { mutate, ...rest } = useMutation({
		mutationKey: [baseQueryKey, "UPDATE"],
		mutationFn: (lesson: ICreateLessonReq) =>
			API.LESSON.UPDATE(lessonId, lesson),
		onMutate: () => {
			toast.loading(loadingMsg);
		},
		onSuccess: ({ message = successMsg }) => {
			toast.success(message);
			invalidateLessons();
		},
		onError: ({ message = errorMsg }) => {
			toast.error(message);
		},
	});

	return {
		updateLesson: mutate,
		...rest,
	};
};

export {
	useGetLessons,
	useGetLesson,
	useCreateLesson,
	useUpdateLesson,
	useDeleteLesson,
};
export { getLessonsOpts, getLessonOpts };

const useInvalidateLessons = () => {
	const { invalidateResource } = useInvalidateResource(baseQueryKey);

	return { invalidateLessons: invalidateResource };
};
