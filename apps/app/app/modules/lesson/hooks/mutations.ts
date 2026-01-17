import { useMutation } from "@tanstack/react-query";
import type { ResourceId } from "@/types";
import { COURSES, LESSON } from "../api";
import { getLessonsOpts } from "./api";

const useUpdateLessonStatus = (lessonId: ResourceId) => {
	const { mutate, ...rest } = useMutation({
		mutationKey: ["LESSON", lessonId, "STATUS"],
		mutationFn: () => LESSON.UPDATE_STATUS(lessonId),
	});
	return { updateStatus: mutate, ...rest };
};

const useToggleCourseSave = () => {
	const queryOpts = getLessonsOpts();

	const { mutate, ...rest } = useMutation({
		mutationKey: ["COURSE", "TOGGLE_SAVE"],
		mutationFn: (courseId: ResourceId) => COURSES.TOGGLE_SAVE(courseId),
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

export { useUpdateLessonStatus, useToggleCourseSave };
