import {
	useFormContext,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import * as React from "react";
import { Editor } from "../editor/Editor";

type InputProps = React.ComponentProps<"textarea">;

type FormInputProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputProps & {
	name: TName;
	desc?: string;
};

const FormEditor = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: FormInputProps<TFieldValues, TName>,
) => {
	const { name } = props;
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<Editor
							content={field.value}
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
