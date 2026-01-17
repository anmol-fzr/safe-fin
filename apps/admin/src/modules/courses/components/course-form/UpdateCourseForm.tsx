import { useNavigate } from "@tanstack/react-router";
import { mixed, object, string } from "yup";
import { convertJsonToMarkdown } from "@/components/editor/Editor";
import { useYupForm } from "@/hooks/form/useYupForm";
import { useUpdateCourse } from "@/modules/courses/hooks/mutations";
import type { ResourceId } from "@/services/api/types";
import { CourseForm } from "./CourseForm";

const courseSchema = object({
	title: string().required().label("Title"),
	desc: string().required().label("Description"),
	content: mixed().required().label("Content"),
});

interface UpdateCourseFormProps {
	course: {
		id: number;
		title: string;
		shortDesc: string;
		longDescJson: any;
	};
}

function UpdateCourseForm(props: UpdateCourseFormProps) {
	const { course } = props;

	const form = useYupForm({
		schema: courseSchema,
		defaultValues: {
			title: course.title,
			desc: course.shortDesc,
			content: course.longDescJson,
		},
	});

	const { updateCourseAsync } = useUpdateCourse();
	const navigate = useNavigate();

	const handleSubmit = form.handleSubmit((values) => {
		const jsonString = values.content;

		const markdown = convertJsonToMarkdown(jsonString);
		console.log(markdown);

		return;
		updateCourseAsync({
			courseId: course.id,
			data: {
				title: values.title,
				shortDesc: values.desc,
				longDesc: markdown,
				longDescJson: jsonString,
			},
		}).then((resp) => {
			navigate({
				to: "/dashboard/courses",
				params: {
					courseId: resp.data.id.toString(),
				},
			});
		});
	}, console.log);

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

export default UpdateCourseForm;
