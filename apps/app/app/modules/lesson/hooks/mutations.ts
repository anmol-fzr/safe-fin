import * as Sentry from "@sentry/react-native";
import { useMutation } from "@tanstack/react-query";
import { produce } from "immer";
import { isInvalidIndex } from "@/pkg/utils";
import type { ResourceId } from "@/types";
import { COURSES, type IReqSaveCourseProgress } from "../api";
import type { SingleCourse } from "../api-types/course_one";
import { getForYouCoursesOpts, getLessonOpts, getLessonsOpts } from "./api";

const captureUnitCompleteException = (
	msg: string,
	extra?: Record<string, unknown>,
) => {
	const err = new Error(msg);

	Sentry.captureException(err, {
		level: "error",
		tags: {
			feature: "course",
			mutation: "save-progress",
		},
		extra,
	});
};

function courseProgressPost(
	data: SingleCourse,
	payload: IReqSaveCourseProgress,
) {
	const { chapterId, unitId } = payload;

	const updatedCourse = produce(data, (course) => {
		const { chapters } = course;

		const chapterIndex = chapters.findIndex((ch) => ch.id === chapterId);
		if (isInvalidIndex(chapterIndex)) {
			captureUnitCompleteException("Chapter index not found");
			return;
		}

		const chapter = chapters[chapterIndex];

		const unitIndex = chapter.units.findIndex((unit) => unit.id === unitId);
		if (isInvalidIndex(unitIndex)) {
			captureUnitCompleteException("Unit index not found");
			return;
		}

		chapter.units[unitIndex].status = "COMPLETED";

		const nextUnitIndex = unitIndex + 1;

		if (nextUnitIndex < chapter.units.length) {
			chapter.units[nextUnitIndex].status = "UNLOCKED";
			return;
		}

		const nextChapterIndex = chapterIndex + 1;

		if (nextChapterIndex < chapters.length) {
			const nextChapter = chapters[nextChapterIndex];

			if (nextChapter.units.length > 0) {
				nextChapter.units[0].status = "UNLOCKED";
			}
			return;
		}

		course.isCompleted = 1;
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
			if (course === undefined) {
				return {
					prevData: null,
					newData: null,
					meta: {
						courseId,
					},
				} as const;
			}

			const updatedCourse = courseProgressPost(course.data, payload);
			const updatedData = {
				data: updatedCourse,
				message: course.message,
			};

			context.client.setQueryData(queryOpts.queryKey, updatedData);

			return {
				prevData: course,
				newData: updatedData,
				meta: {
					courseId,
				},
			} as const;
		},
		onError: (err, payload, onMutateResult, context) => {
			if (err) {
				captureUnitCompleteException(err.message);
			}

			const queryOpts = getLessonOpts(payload.courseId);

			if (!onMutateResult?.prevData) {
				captureUnitCompleteException(
					"Optimistic rollback failed: missing data",
					{
						payload,
						queryKey: queryOpts.queryKey,
					},
				);

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
		onError: (_err, _courseId, onMutateResult, context) => {
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
