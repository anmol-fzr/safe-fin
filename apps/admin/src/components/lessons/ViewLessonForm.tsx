import { useGetLesson } from "@/hooks/api/lesson";
import { useYupForm } from "@/hooks/form/useYupForm";
import { newLessonSchema } from "@/schema/lesson";
import type { ResourceId } from "@/services/api/types";
import { LessonForm } from "./LessonForm";

type ViewLessonFormProps = {
	lessonId: ResourceId;
	disabled?: boolean;
};

function ViewLessonForm({ lessonId, disabled = false }: ViewLessonFormProps) {
	const { lesson } = useGetLesson(lessonId);

	const form = useYupForm({
		schema: newLessonSchema,
		disabled,
		defaultValues: {
			title: lesson.data.title,
			desc: lesson.data.desc,
			content: lesson.data.contentJson,
		},
	});

	const handleSubmit = form.handleSubmit(() => {});

	return (
		<LessonForm.Root
			form={form}
			handleSubmit={handleSubmit}
			className="min-w-[900px]"
		>
			<div className="flex flex-col  w-full">
				<h3 className="text-4xl font-medium">{lesson.data.title}</h3>
				<p>{lesson.data.desc}</p>
				<LessonForm.Editor />
			</div>
		</LessonForm.Root>
	);
}

export { ViewLessonForm };
export default ViewLessonForm;
