import { useMutation } from "@tanstack/react-query";
import type { ResourceId } from "@/types";
import { COURSES, LESSON } from "../api";
import { getLessonsOpts } from "./api";

const useSaveCourseProgress = () => {
	const { mutate, ...rest } = useMutation({
		mutationKey: ["COURSE", "PROGRESS", "SAVE"],
		mutationFn: COURSES.PROGRESS.SAVE,
	});

	return { saveCourseProgress: mutate, ...rest };
};

const useUpdateLessonStatus = () => {
	const { mutate, ...rest } = useMutation({
		mutationKey: ["LESSON", "STATUS"],
		mutationFn: LESSON.UPDATE_STATUS,
	});
	return { updateStatus: mutate, ...rest };
};

const useToggleCourseSave = () => {
	const queryOpts = getLessonsOpts();

	const { mutate, ...rest } = useMutation({
		mutationKey: ["COURSE", "SAVE", "TOGGLE"],
		mutationFn: (courseId: ResourceId) => COURSES.SAVED.TOGGLE(courseId),
		onMutate: async (courseId, context) => {
			const prevCourses = context.client.getQueryData(queryOpts.queryKey);

			const newCourses = structuredClone(prevCourses);
			newCourses?.data.forEach((course) => {
				if (course.id === courseId) {
					course.isSaved = course.isSaved === 0 ? 1 : 0;
				}
			});

			context.client.setQueryData(queryOpts.queryKey, newCourses);

			return { prevCourses, newCourses, courseId };
		},
		onError: (err, courseId, onMutateResult, context) => {
			context.client.setQueryData(
				queryOpts.queryKey,
				onMutateResult?.prevCourses,
			);
		},
	});

	return { toggleSave: mutate, ...rest };
};

export { useUpdateLessonStatus, useToggleCourseSave, useSaveCourseProgress };
