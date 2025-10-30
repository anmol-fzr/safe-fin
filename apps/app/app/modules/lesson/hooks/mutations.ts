import { useMutation } from "@tanstack/react-query";
import type { ResourceId } from "@/types";
import { LESSON } from "../api";

const useUpdateLessonStatus = (lessonId: ResourceId) => {
	const { mutate, ...rest } = useMutation({
		mutationKey: ["LESSON", lessonId, "STATUS"],
		mutationFn: () => LESSON.UPDATE_STATUS(lessonId),
	});
	return { updateStatus: mutate, ...rest };
};

export { useUpdateLessonStatus };
