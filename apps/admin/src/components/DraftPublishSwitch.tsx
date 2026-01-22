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
	labels?: [offLabel: string, onLabel: string];
	name?: TName;
	desc?: string;
};

export const DraftPublishSwitch = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
	props: FormSwitchProps<TFieldValues, TName>,
) => {
	const { name = "isPublished", labels = ["Draft", "Publish"] } = props;
	const form = useFormContext();
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<div className="flex gap-4">
						<FormLabel>{labels[0]}</FormLabel>
						<FormControl>
							<Switch {...field} />
						</FormControl>
						<FormLabel>{labels[1]}</FormLabel>
					</div>
					<FormDescription>{props?.desc}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
