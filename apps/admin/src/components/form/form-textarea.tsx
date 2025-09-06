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
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";

type InputProps = React.ComponentProps<"textarea">;

type FormInputProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputProps & {
	label: string;
	placeholder: string;
	name: TName;
	desc?: string;
};

const FormTextarea = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: FormInputProps<TFieldValues, TName>,
) => {
	const { name, label, placeholder } = props;
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Textarea placeholder={placeholder} {...field} />
					</FormControl>
					<FormDescription>{props?.desc}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export { FormTextarea };
