import {
	infiniteQueryOptions,
	queryOptions,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import type { ResourceId } from "@/types";
import { COURSES, LESSON, TOPIC } from "../api";

const baseQueryKey = "COURSES";

function getForYouCoursesOpts() {
	return queryOptions({
		queryKey: [baseQueryKey, "FOR_YOU"],
		queryFn: () => COURSES.FOR_YOU(),
	});
}

export const useGetForYouCourses = () => {
	const opts = getForYouCoursesOpts();
	const { data, ...rest } = useSuspenseQuery(opts);

	return { courses: data.data, ...rest };
};

function getLessonOpts(lessonId: ResourceId) {
	return queryOptions({
		queryKey: [baseQueryKey, lessonId],
		queryFn: () => COURSES.ONE(lessonId),
	});
}

const useGetLesson = (lessonId: ResourceId) => {
	const opts = getLessonOpts(lessonId);
	const { data, ...rest } = useSuspenseQuery(opts);
	return { lesson: data.data, ...rest };
};

function getLessonsOpts() {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey],
		queryFn: COURSES.ALL,
		initialPageParam: { limit: 10, page: 1 },
		getNextPageParam: ({ paginate }) => {
			if (!paginate.hasMore) return null;
			return {
				limit: 10,
				page: paginate.nextPage,
			};
		},
	});
}

const useGetLessons = () => {
	const opts = getLessonsOpts();
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	const courses = useMemo(
		() => data.pages.flatMap((page) => page.data),
		[data],
	);

	return { courses, ...rest };
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

function getLastLessonOpts() {
	return queryOptions({
		queryKey: [baseQueryKey, "LAST"],
		queryFn: LESSON.LAST,
	});
}

const useGetLastLesson = () => {
	const opts = getLastLessonOpts();
	const { data, ...rest } = useSuspenseQuery(opts);

	return { lesson: data?.data || null, ...rest };
};

function getSavedCoursesOpts() {
	return infiniteQueryOptions({
		queryKey: [baseQueryKey, "SAVED"],
		queryFn: COURSES.SAVED.ALL,
		initialPageParam: { limit: 10, page: 1 },
		getNextPageParam: ({ paginate }, allPages, lastPageParam) => {
			if (!paginate.hasMore) return null;

			return {
				limit: lastPageParam.limit,
				page: paginate.nextPage,
			};
		},
	});
}

const useGetSavedCourses = () => {
	const opts = getSavedCoursesOpts();
	const { data, ...rest } = useSuspenseInfiniteQuery(opts);

	return { courses: data, ...rest };
};

export { getLessonsOpts, getLessonOpts, getSavedCoursesOpts };
export {
	useGetLessons,
	useGetLesson,
	useGetLessonTopics,
	useGetLastLesson,
	useGetSavedCourses,
};
