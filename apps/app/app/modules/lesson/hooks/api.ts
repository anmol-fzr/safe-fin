import {
	infiniteQueryOptions,
	queryOptions,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import type { ResourceId } from "@/types";
import { COURSES, LESSON } from "../api";

const baseQueryKey = "COURSES";

function getLastLeftCourse() {
	return queryOptions({
		queryKey: [baseQueryKey, "LEFT", "IN_PROGRESS"],
		queryFn: COURSES.PROGRESS.LAST,
	});
}

export const useGetLastLeftCourse = () => {
	const opts = getLastLeftCourse();
	const { data, ...rest } = useSuspenseQuery(opts);

	return { course: data.data, ...rest };
};

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
		queryFn: ({ pageParam }) => COURSES.ALL(pageParam),
		initialPageParam: { limit: 10, page: 1 },
		getNextPageParam: ({ paginate }, _allPages, lastPageParam) => {
			if (!paginate.hasMore) return null;
			return {
				limit: lastPageParam.limit,
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
		getNextPageParam: ({ paginate }, _allPages, lastPageParam) => {
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

export {
	getLessonsOpts,
	getLessonOpts,
	getSavedCoursesOpts,
	getForYouCoursesOpts,
};
export { useGetLessons, useGetLesson, useGetLastLesson, useGetSavedCourses };
