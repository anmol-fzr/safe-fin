import { Controller, useFormContext } from "react-hook-form";
import { Field } from "../Field";
import { SelectChips, type SelectChipsOptionsProps } from "../SelectChips";

type FormFieldProps<T> = SelectChipsOptionsProps<T> & {
	name: string;
	label: string;
};

export const FormSelectChips = <J,>(props: FormFieldProps<J>) => {
	const { label, options, optionRenderer, valueRenderer } = props;
	const { control, formState } = useFormContext();

	type T = typeof formState.errors;

	const getValue = (obj: T, path: string) =>
		path.split(".").reduce((acc, key) => acc && acc[key], obj);

	const error =
		getValue(formState?.errors, props.name)?.message.toString() ?? "";

	return (
		<Field>
			<Controller
				control={control}
				render={({ field: { onChange, value, disabled } }) => (
					<SelectChips.Root {...{ value, onChange, disabled }}>
						<SelectChips>
							<SelectChips.Label
								label={label}
								status={error ? "error" : undefined}
							/>
							<SelectChips.Options
								{...{ valueRenderer, optionRenderer, options }}
							/>
						</SelectChips>
					</SelectChips.Root>
				)}
				name={props.name}
			/>
			{error && <Field.Error>{error}</Field.Error>}
		</Field>
	);
};
