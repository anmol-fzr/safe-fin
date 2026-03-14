import { useForm } from "react-hook-form";
import { QuestionForm, type QuestionFormRootProps } from "./QuestionForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface NewQuestionFormProps
	extends Pick<QuestionFormRootProps, "form" | "handleSubmit"> {
	onCancel: VoidFunction;
}

const schema = Yup.object({
	question: Yup.string().required(),
	reason: Yup.string().required(),
	isPublished: Yup.boolean().default(false),
});

export const useNewQuestionForm = () => {
	return useForm({
		resolver: yupResolver(schema),
	});
};

export function NewQuestionForm(props: NewQuestionFormProps) {
	const { form, handleSubmit, onCancel } = props;

	return (
		<QuestionForm
			{...{ form, handleSubmit }}
			className="flex flex-col gap-6 mx-auto"
		>
			<QuestionForm.QuestionField />
			<QuestionForm.ReasonField />
			<QuestionForm.PublishSwitch />

			<QuestionForm.Actions>
				<QuestionForm.CancelAction onClick={onCancel} />
				<QuestionForm.SaveAction />
			</QuestionForm.Actions>
		</QuestionForm>
	);
}
