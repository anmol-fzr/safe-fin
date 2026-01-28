import { useNavigate } from "@tanstack/react-router";
import { boolean, mixed, object, string } from "yup";
import { convertJsonToMarkdown } from "@/components/editor/Editor";
import { useCreateCourse } from "@/modules/courses/hooks/mutations";
import { CourseForm } from "./CourseForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const courseSchema = object({
	title: string().required().label("Title"),
	desc: string().required().label("Description"),
	content: string().required().label("Content").min(10),
	level: string().required().label("Course Difficulty Level"),
	isPublished: boolean().label("Publish or Draft").default(false),
	coverImage: mixed().required().label("Cover Image"),
	coverPath: string().required().label("Cover Path"),
	//coverImage: string().nullable().label("Cover Image"),
});

function NewCourseForm() {
	const form = useForm({ resolver: yupResolver(courseSchema) });

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
			coverPath: values.coverPath,
			isPublished: values.isPublished,
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
		<CourseForm.Root
			form={form}
			handleSubmit={handleSubmit}
			className="flex justify-center"
		>
			<CourseForm.Editor className="flex-1 w-full" />
			<div className="w-full max-w-md space-y-4">
				<div className="w-full space-y-4">
					<CourseForm.TitleField />
					<CourseForm.DescField />
					<CourseForm.LevelSelect />
					<CourseForm.PublishSwitch />
					<CourseForm.CoverImageField />
				</div>
				<CourseForm.Actions>
					<CourseForm.SaveAction />
				</CourseForm.Actions>
			</div>
		</CourseForm.Root>
	);
}

export default NewCourseForm;
