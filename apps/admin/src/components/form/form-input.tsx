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
import { Input, type InputProps } from "@/components/ui/input";

type FormInputProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputProps & {
	label: string;
	placeholder: string;
	name: TName;
	desc?: string;
};

const FormInput = <
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
						<Input placeholder={placeholder} {...field} />
					</FormControl>
					<FormDescription>{props?.desc}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export { FormInput };
