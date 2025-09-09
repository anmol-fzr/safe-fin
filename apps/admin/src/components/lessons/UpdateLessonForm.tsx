import { newLessonSchema } from "@/schema/lesson";
import { useYupForm } from "@/hooks/form/useYupForm";
import { useGetLesson, useUpdateLesson } from "@/hooks/api/lesson";
import { convertJsonToMarkdown } from "../editor/Editor";
import type { ResourceId } from "@/services/api/types";
import { LessonForm, useLessonActionFormRef } from "./LessonForm";

type UpdateLessonFormProps = {
	lessonId: ResourceId;
};

export function UpdateLessonForm({ lessonId }: UpdateLessonFormProps) {
	const { lesson } = useGetLesson(lessonId);

	const form = useYupForm({
		schema: newLessonSchema,
		defaultValues: {
			...lesson.data,
			content: JSON.parse(lesson.data.contentJson),
		},
	});

	const { ref, toDraft, toPublish } = useLessonActionFormRef();

	const { updateLesson } = useUpdateLesson(lessonId);

	const handleSubmit = form.handleSubmit((values) => {
		const isPublished = ref.current === "publish";

		const jsonString = values.content;

		const markdown = convertJsonToMarkdown(jsonString);

		updateLesson({
			...values,
			content: markdown,
			isPublished,
			contentJson: jsonString,
		});
	});

	return (
		<>
			<LessonForm
				form={form}
				handleSubmit={handleSubmit}
				handleDraft={toDraft}
				handlePublish={toPublish}
			/>
		</>
	);
}
