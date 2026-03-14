import { useCreateLesson } from "@/hooks/api/lesson";
import { useYupForm } from "@/hooks/form/useYupForm";
import { newLessonSchema } from "@/schema/lesson";
import { convertJsonToMarkdown } from "../editor/Editor";
import { LessonForm, useLessonActionFormRef } from "./LessonForm";

function NewLessonForm() {
	const form = useYupForm({ schema: newLessonSchema });
	const { ref, toPublish, toDraft } = useLessonActionFormRef();

	const { createLesson } = useCreateLesson();

	const handleSubmit = form.handleSubmit((values) => {
		const isPublished = ref.current === "publish";

		const jsonString = values.content;

		const markdown = convertJsonToMarkdown(jsonString);

		createLesson({
			title: values.title,
			desc: values.desc,
			isPublished,
			content: markdown,
			contentJson: jsonString,
		});
	});

	return (
		<LessonForm.Root form={form} handleSubmit={handleSubmit}>
			<LessonForm.Editor />
			<div className="w-full max-w-md space-y-4">
				<div className="w-full max-w-md space-y-4">
					<LessonForm.TitleField />
					<LessonForm.DescField />
				</div>
				<LessonForm.Actions>
					<LessonForm.PublishAction handlePublish={toPublish} />
					<LessonForm.DraftAction handleDraft={toDraft} />
				</LessonForm.Actions>
			</div>
		</LessonForm.Root>
	);
}

export { NewLessonForm };
export default NewLessonForm;
