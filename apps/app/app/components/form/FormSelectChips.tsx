import { Controller, useFormContext } from "react-hook-form";
import { Field } from "../Field";
import { SelectChips, type SelectChipsOptionsProps } from "../SelectChips";

export type FormSelectChipsProps<T> = SelectChipsOptionsProps<T> & {
	name: string;
	label: string;
	multiple?: boolean;
};

export const FormSelectChips = <J,>(props: FormSelectChipsProps<J>) => {
	const {
		label,
		options,
		optionRenderer,
		valueRenderer,
		multiple = false,
	} = props;
	const { control, formState } = useFormContext();

	const getValue = (obj: any, path: string) =>
		path.split(".").reduce((acc, key) => acc && acc[key], obj);

	const error =
		getValue(formState?.errors, props.name)?.message.toString() ?? "";

	return (
		<Field>
			<Controller
				control={control}
				render={({ field: { onChange, value, disabled } }) => (
					<SelectChips.Root {...{ value, onChange, disabled, multiple }}>
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
