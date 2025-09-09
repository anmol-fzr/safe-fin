import { newLessonSchema } from "@/schema/lesson";
import { useYupForm } from "@/hooks/form/useYupForm";
import { useCreateLesson } from "@/hooks/api/lesson";
import { renderToMarkdown } from "@tiptap/static-renderer";
import { extensions } from "../editor/Editor";
import { LessonForm, useLessonActionFormRef } from "./LessonForm";

export function NewLessonForm() {
	const form = useYupForm({ schema: newLessonSchema });
	const { ref, toPublish, toDraft } = useLessonActionFormRef();

	const { createLesson } = useCreateLesson();

	const handleSubmit = form.handleSubmit((values) => {
		const isPublished = ref.current === "publish";

		const json = values.content;
		const markdown = renderToMarkdown({ content: json, extensions });

		createLesson({
			...values,
			isPublished,
			content: markdown,
			contentJson: JSON.stringify(json),
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
