import type * as React from "react";
import {
	type FieldPath,
	type FieldValues,
	useFormContext,
} from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Editor } from "../editor/Editor";

type InputProps = React.ComponentProps<"textarea">;

type FormInputProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputProps & {
	name: TName;
	label: TName;
	desc?: string;
};

const FormEditor = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: FormInputProps<TFieldValues, TName>,
) => {
	const { name, label } = props;
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Editor
							content={field.value}
							disabled={field.disabled}
							setContent={(val) => field.onChange(JSON.stringify(val))}
						/>
					</FormControl>
					<FormDescription>{props?.desc}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export { FormEditor };
