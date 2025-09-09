import { newLessonSchema } from "@/schema/lesson";
import { useYupForm } from "@/hooks/form/useYupForm";
import { useGetLesson, useUpdateLesson } from "@/hooks/api/lesson";
import { renderToMarkdown } from "@tiptap/static-renderer";
import { extensions } from "../editor/Editor";
import type { ResourceId } from "@/services/api/types";
import { LessonForm, useLessonActionFormRef } from "./LessonForm";
import { useAutoSubmit } from "@/hooks/form/useAutoSubmit";

type UpdateLessonFormProps = {
	lessonId: ResourceId;
};

export function UpdateLessonForm({ lessonId }: UpdateLessonFormProps) {
	const { lesson } = useGetLesson(lessonId);
	const form = useYupForm({
		schema: newLessonSchema,
		defaultValues: {
			...lesson.data,
			content: lesson.data.contentJson,
		},
	});

	const { ref, toDraft, toPublish } = useLessonActionFormRef();

	const { updateLesson } = useUpdateLesson(lessonId);

	const handleSubmit = form.handleSubmit((values) => {
		console.log("Submitting");
		const isPublished = ref.current === "publish";

		const json = values.content;
		const markdown = renderToMarkdown({ content: json, extensions });

		updateLesson({
			...values,
			content: markdown,
			isPublished,
			contentJson: JSON.stringify(json),
		});
	}, console.log);

	const { isSubmiting } = useAutoSubmit({
		trigger: form.trigger,
		watch: form.watch,
		onSubmit: handleSubmit,
	});
	console.log({ isSubmiting });

	return (
		<>
			{isSubmiting && <p>Saving ...</p>}
			<LessonForm
				form={form}
				handleSubmit={handleSubmit}
				handleDraft={toDraft}
				handlePublish={toPublish}
			/>
		</>
	);
}
