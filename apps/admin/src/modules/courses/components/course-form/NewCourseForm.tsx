import { useNavigate, useRouter } from "@tanstack/react-router";
import { object, string } from "yup";
import { convertJsonToMarkdown } from "@/components/editor/Editor";
import { useYupForm } from "@/hooks/form/useYupForm";
import { useCreateCourse } from "@/modules/courses/hooks/mutations";
import { CourseForm } from "./CourseForm";

const courseSchema = object({
	title: string().required().label("Title"),
	desc: string().required().label("Description"),
	content: string().required().label("Content"),
});

function NewCourseForm() {
	const form = useYupForm({ schema: courseSchema });

	const { createCourseAsync } = useCreateCourse();
	const navigate = useNavigate();

	const handleSubmit = form.handleSubmit((values) => {
		const jsonString = values.content;

		const markdown = convertJsonToMarkdown(jsonString);

		createCourseAsync({
			title: values.title,
			shortDesc: values.desc,
			longDesc: markdown,
			longDescJson: jsonString,
		}).then((resp) => {
			navigate({
				to: "/dashboard/courses/$courseId/edit/curriculum",
				params: {
					courseId: resp.data.id.toString(),
				},
			});
		});
	});

	return (
		<CourseForm.Root form={form} handleSubmit={handleSubmit}>
			<CourseForm.Editor />
			<div className="w-full max-w-md space-y-4">
				<div className="w-full max-w-md space-y-4">
					<CourseForm.TitleField />
					<CourseForm.DescField />
				</div>
				<CourseForm.Actions>
					<CourseForm.SaveAction />
				</CourseForm.Actions>
			</div>
		</CourseForm.Root>
	);
}

export default NewCourseForm;
