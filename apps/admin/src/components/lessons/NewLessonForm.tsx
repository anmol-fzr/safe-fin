import { newLessonSchema } from "@/schema/lesson";
import { useYupForm } from "@/hooks/form/useYupForm";
import { useCreateLesson } from "@/hooks/api/lesson";
import { convertJsonToMarkdown } from "../editor/Editor";
import { LessonForm, useLessonActionFormRef } from "./LessonForm";

export function NewLessonForm() {
	const form = useYupForm({ schema: newLessonSchema });
	const { ref, toPublish, toDraft } = useLessonActionFormRef();

	const { createLesson } = useCreateLesson();

	const handleSubmit = form.handleSubmit((values) => {
		const isPublished = ref.current === "publish";

		const jsonString = values.content;

		const markdown = convertJsonToMarkdown(jsonString);

		createLesson({
			...values,
			isPublished,
			content: markdown,
			contentJson: jsonString,
		});
	});

	return (
		<LessonForm
			form={form}
			handlePublish={toPublish}
			handleDraft={toDraft}
			handleSubmit={handleSubmit}
		/>
	);
}
