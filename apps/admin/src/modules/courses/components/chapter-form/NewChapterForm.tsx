import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useCreateChapter } from "../../hooks/mutations";
import { FormSwitch } from "@/components/form/form-switch";
import type { ResourceId } from "@/services/api/types";

const newChapterSchema = Yup.object({
	title: Yup.string().required("Chapter title is required").min(3).max(256),
	isPublished: Yup.boolean().label("Published / Draft"),
});

interface NewChapterFormProps {
	courseId: ResourceId;
	onCancel: VoidFunction;
	index: number;
}

export function NewChapterForm(props: NewChapterFormProps) {
	const { index = 0, courseId, onCancel } = props;

	const newChapterForm = useForm({
		resolver: yupResolver(newChapterSchema),
		defaultValues: {
			title: "",
			isPublished: false,
		},
	});

	const { createChapter } = useCreateChapter();

	const handleCancel = () => {
		newChapterForm.reset();
		onCancel();
	};

	const handleCreateChapter = newChapterForm.handleSubmit((data) => {
		const { title, isPublished = false } = data;

		createChapter(
			{
				courseId,
				chapters: [{ title, index }],
				isPublished,
			},
			{
				onSuccess: handleCancel,
			},
		);
	});

	return (
		<form onSubmit={handleCreateChapter}>
			<FormProvider {...newChapterForm}>
				<div className="space-y-4">
					<FormInput
						name="title"
						label="Chapter Title"
						placeholder="e.g., Introduction to Finance"
					/>
					<FormSwitch name="isPublished" label="isPublished" />
					<div className="flex gap-2">
						<Button type="submit">Create Chapter</Button>
						<Button type="button" variant="outline" onClick={handleCancel}>
							Cancel
						</Button>
					</div>
				</div>
			</FormProvider>
		</form>
	);
}
