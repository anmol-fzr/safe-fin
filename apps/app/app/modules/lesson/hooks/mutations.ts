import * as Sentry from "@sentry/react-native";
import { useMutation } from "@tanstack/react-query";
import { produce } from "immer";
import type { ResourceId } from "@/types";
import { COURSES, type IReqSaveCourseProgress } from "../api";
import type { SingleCourse } from "../api-types/course_one";
import { getForYouCoursesOpts, getLessonOpts, getLessonsOpts } from "./api";

function makeUnitComplete(data: SingleCourse, payload: IReqSaveCourseProgress) {
	const { chapterId, unitId } = payload;

	const updatedCourse = produce(data, (course) => {
		const foundChapter = course.chapters.find((ch) => ch.id === chapterId);

		if (foundChapter !== undefined) {
			const { units } = foundChapter;

			const foundUnitIndx = units.findIndex((unit) => unit.id === unitId);

			if (foundUnitIndx > -1) {
				const foundUnit = units[foundUnitIndx];
				foundUnit.status = "COMPLETED";

				const nextUnitIndx = foundUnitIndx + 1;

				if (nextUnitIndx <= units.length - 1) {
					const nextUnit = units[nextUnitIndx];
					nextUnit.status = "UNLOCKED";
				}
			}
		}
	});

	return updatedCourse;
}

const useSaveCourseProgress = () => {
	const { mutate, ...rest } = useMutation({
		mutationKey: ["COURSE", "PROGRESS", "SAVE"],
		mutationFn: COURSES.PROGRESS.SAVE,
		onMutate: async (payload, context) => {
			const { courseId } = payload;

			const queryOpts = getLessonOpts(courseId);

			const course = context.client.getQueryData(queryOpts.queryKey);
			if (course !== undefined) {
				const updatedCourse = makeUnitComplete(course.data, payload);
				const updatedData = {
					data: updatedCourse,
					message: course.message,
				};

				context.client.setQueryData(queryOpts.queryKey, updatedData);

				return {
					prevData: course,
					newData: updatedData,
					courseId,
				};
			}

			return {
				prevData: course,
				newData: null,
				courseId,
			};
		},
		onError: (err, payload, onMutateResult, context) => {
			if (err) {
				Sentry.captureException(err, {
					level: "error",
					tags: {
						feature: "course",
						mutation: "save-progress",
					},
				});
				return;
			}

			const queryOpts = getLessonOpts(payload.courseId);

			if (!onMutateResult) {
				const error = new Error("Optimistic rollback failed: missing context");

				Sentry.captureException(error, {
					level: "warning",
					tags: {
						feature: "course",
						mutation: "save-progress",
					},
					extra: {
						payload,
						queryKey: queryOpts.queryKey,
					},
				});

				return;
			}

			const { newData } = onMutateResult;

			if (newData === null) {
				const error = new Error("Optimistic rollback failed: missing data");

				Sentry.captureException(error, {
					level: "warning",
					tags: {
						feature: "course",
						mutation: "save-progress",
					},
					extra: {
						payload,
						queryKey: queryOpts.queryKey,
					},
				});

				return;
			}

			context.client.setQueryData(queryOpts.queryKey, onMutateResult.prevData);
		},
	});

	return { saveCourseProgress: mutate, ...rest };
};

const useToggleCourseSave = () => {
	const queryOpts = getLessonsOpts();
	const forYouQueryOpts = getForYouCoursesOpts();

	const { mutate, ...rest } = useMutation({
		mutationKey: ["COURSE", "SAVE", "TOGGLE"],
		mutationFn: (courseId: ResourceId) => COURSES.SAVED.TOGGLE(courseId),
		onMutate: async (courseId, context) => {
			const prevCourses = context.client.getQueryData(queryOpts.queryKey);

			const newCourses = structuredClone(prevCourses);
			newCourses?.pages.forEach((page) => {
				page.data.forEach((course) => {
					if (course.id === courseId) {
						course.isSaved = course.isSaved === 0 ? 1 : 0;
					}
				});
			});
			context.client.setQueryData(queryOpts.queryKey, newCourses);

			// For You
			const prevForYouCourses = context.client.getQueryData(
				forYouQueryOpts.queryKey,
			);

			const newForYouCourses = structuredClone(prevForYouCourses);
			newForYouCourses?.data.forEach((course) => {
				if (course.id === courseId) {
					course.isSaved = course.isSaved === 0 ? 1 : 0;
				}
			});
			context.client.setQueryData(forYouQueryOpts.queryKey, newForYouCourses);

			return {
				prevCourses,
				newCourses,
				courseId,
				prevForYouCourses,
				newForYouCourses,
			};
		},
		onError: (err, courseId, onMutateResult, context) => {
			context.client.setQueryData(
				queryOpts.queryKey,
				onMutateResult?.prevCourses,
			);

			context.client.setQueryData(
				forYouQueryOpts.queryKey,
				onMutateResult?.prevForYouCourses,
			);
		},
	});

	return { toggleSave: mutate, ...rest };
};

export { useToggleCourseSave, useSaveCourseProgress };
