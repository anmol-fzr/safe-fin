import { useForm } from "react-hook-form";
import { OptionForm, type OptionFormRootProps } from "./OptionForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

interface NewOptionFormProps
	extends Pick<OptionFormRootProps, "form" | "handleSubmit"> {
	onCancel: VoidFunction;
}

const schema = Yup.object({
	value: Yup.string().required(),
});

export const useNewOptionForm = () => {
	return useForm({
		resolver: yupResolver(schema),
	});
};

export function NewOptionForm(props: NewOptionFormProps) {
	const { form, handleSubmit, onCancel } = props;

	return (
		<OptionForm
			{...{ form, handleSubmit }}
			className="flex flex-col gap-6 mx-auto"
		>
			<OptionForm.ValueField />

			<OptionForm.Actions>
				<OptionForm.CancelAction onClick={onCancel} />
				<OptionForm.SaveAction />
			</OptionForm.Actions>
		</OptionForm>
	);
}
