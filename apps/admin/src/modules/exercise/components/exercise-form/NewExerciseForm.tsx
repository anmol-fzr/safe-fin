import { useForm } from "react-hook-form";
import { ExerciseForm, type ExerciseFormRootProps } from "./ExerciseForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type NewExerciseFormProps = Pick<
	ExerciseFormRootProps,
	"form" | "handleSubmit"
>;

const schema = Yup.object({
	title: Yup.string().required(),
	desc: Yup.string().required(),
	isPublished: Yup.boolean().default(false),
	chapterId: Yup.number().required(),
});

export const useNewExerciseForm = () => {
	return useForm({
		resolver: yupResolver(schema),
	});
};

export function NewExerciseForm(props: NewExerciseFormProps) {
	const { form, handleSubmit } = props;

	return (
		<div className="ml-4 max-w-lg">
			<ExerciseForm
				{...{ form, handleSubmit }}
				className="flex flex-col gap-6 mx-auto"
			>
				<ExerciseForm.TitleField />
				<ExerciseForm.DescField />
				<ExerciseForm.ChapterIdField />
				<ExerciseForm.PublishSwitch />

				<ExerciseForm.Actions>
					<ExerciseForm.CancelAction />
					<ExerciseForm.SaveAction />
				</ExerciseForm.Actions>
			</ExerciseForm>
		</div>
	);
}
