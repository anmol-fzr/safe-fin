import type { ResourceId } from "@/services/api/types";
import { useCreateUnit } from "../../hooks/mutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { newUnitSchema } from "../../schema/unit.schema";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { FormSwitch } from "@/components/form/form-switch";
import { FormEditor } from "@/components/form/form-editor";
import { FormTextarea } from "@/components/form/form-textarea";
import { convertJsonToMarkdown } from "@/components/editor/Editor";

interface CreateUnitPayload {
	title: string;
	shortDesc: string;
	content: any;
	points: number;
	isPublished: boolean;
}

interface NewUnitFormProps {
	chapterId: ResourceId;
	index: number;
	onCancel: VoidFunction;
}

const useNewUnitForm = () => {
	const newUnitForm = useForm({
		resolver: yupResolver(newUnitSchema),
		defaultValues: {
			title: "",
			shortDesc: "",
			content: "",
			points: 250,
			isPublished: false,
		},
	});

	return newUnitForm;
};

export const NewUnitForm = (props: NewUnitFormProps) => {
	const { chapterId, index, onCancel } = props;

	const { createUnit } = useCreateUnit();

	const newUnitForm = useNewUnitForm();

	const handleCancel = () => {
		newUnitForm.reset();
		onCancel();
	};

	const handleCreateUnit = (chapterId: ResourceId, data: CreateUnitPayload) => {
		const markdown = convertJsonToMarkdown(data.content);
		const { title, shortDesc, points, isPublished } = data;

		const unit = {
			title,
			shortDesc,
			longDesc: {
				content: markdown,
				contentJson: data.content,
			},
			points,
			index,
			isPublished,
		};

		createUnit(
			{
				chapterId,
				units: [unit],
			},
			{
				onSuccess: handleCancel,
			},
		);
	};

	const handleSubmit = newUnitForm.handleSubmit((data) => {
		handleCreateUnit(chapterId, data);
	});

	return (
		<form className="w-full" onSubmit={handleSubmit}>
			<FormProvider {...newUnitForm}>
				<div className="space-y-4">
					<FormInput
						name="title"
						label="Unit Title"
						placeholder="e.g., Understanding Budgets"
					/>
					<FormTextarea
						name="shortDesc"
						label="Short Description"
						placeholder="Brief description of this unit"
					/>
					<FormEditor
						name="content"
						label="Content"
						placeholder="Main content of the unit"
						rows={4}
					/>
					<FormSwitch name="isPublished" label="isPublished" />
					<FormInput
						name="points"
						label="Points"
						type="number"
						placeholder="10"
					/>
					<div className="flex gap-2">
						<Button type="submit" size="sm">
							Create Unit
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={handleCancel}
						>
							Cancel
						</Button>
					</div>
				</div>
			</FormProvider>
		</form>
	);
};
