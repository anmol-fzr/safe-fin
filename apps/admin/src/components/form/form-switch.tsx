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
import { Switch, type SwitchProps } from "@/components/ui/switch";

type FormSwitchProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = SwitchProps & {
	labels: [offLabel: string, onLabel: string];
	placeholder: string;
	name: TName;
	desc?: string;
};

export const FormSwitch = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: FormSwitchProps<TFieldValues, TName>,
) => {
	const { name, labels } = props;
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{labels[0]}</FormLabel>
					<FormControl>
						<Switch {...field} />
					</FormControl>
					<FormDescription>{props?.desc}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
