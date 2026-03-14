import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useGetLesson, useUpdateLesson } from "@/hooks/api/lesson";
import { newLessonSchema } from "@/schema/lesson";
import type { ResourceId } from "@/services/api/types";
import { convertJsonToMarkdown } from "../editor/Editor";
import { LessonForm, useLessonActionFormRef } from "./LessonForm";

type UpdateLessonFormProps = {
	lessonId: ResourceId;
	disabled?: boolean;
};

function UpdateLessonForm({
	lessonId,
	disabled = false,
}: UpdateLessonFormProps) {
	const { lesson } = useGetLesson(lessonId);

	const form = useForm({
		resolver: yupResolver(newLessonSchema),
		disabled,
		defaultValues: {
			title: lesson.data.title,
			desc: lesson.data.desc,
			content: lesson.data.contentJson,
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
export { UpdateLessonForm };
export default UpdateLessonForm;
