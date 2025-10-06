import {
	infiniteQueryOptions,
	queryOptions,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { LESSON, TOPIC } from "../api";

const baseQueryKey = "LESSONS";

function getLessonOpts(lessonId: number) {
	return queryOptions({
		queryKey: [baseQueryKey, lessonId],
		queryFn: () => LESSON.ONE(lessonId),
	});
}

const useGetLesson = (lessonId: number) => {
	const opts = getLessonOpts(lessonId);
	const { data: lesson, ...rest } = useSuspenseQuery(opts);
	return { lesson, ...rest };
};

function getLessonsOpts() {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey],
		queryFn: ({ pageParam }) => LESSON.ALL(pageParam),
		initialPageParam: { limit: 10, offset: 0 },
		getNextPageParam: (lastPage, allPages, lastPageParam, allPagesParams) => {
			return undefined;
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

const useGetLessons = () => {
	const opts = getLessonsOpts();
	const {
		data: lessons,
		fetchNextPage: fetchNextLessonPage,
		...rest
	} = useSuspenseInfiniteQuery(opts);

	return { lessons, fetchNextLessonPage, ...rest };
};

function getLessonTopicsOpts() {
	return queryOptions({
		queryKey: [baseQueryKey, "TOPICS"],
		queryFn: TOPIC.ALL,
	});
}

const useGetLessonTopics = () => {
	const opts = getLessonTopicsOpts();
	const { data: topics, ...rest } = useSuspenseQuery(opts);
	return { topics, ...rest };
};

export { useGetLessons, useGetLesson, useGetLessonTopics };
