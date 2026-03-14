import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Form, type FormSubmitHandler } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export type OptionFormRootProps = PropsWithChildren & {
	form: UseFormReturn;
	handleSubmit: FormSubmitHandler;
	className?: string;
};

function OptionFormRoot({
	form,
	handleSubmit,
	className,
	children,
}: OptionFormRootProps) {
	return (
		<Form
			{...form}
			className={cn("flex gap-6", className)}
			onSubmit={handleSubmit}
		>
			<FormProvider {...form}>{children}</FormProvider>
		</Form>
	);
}

OptionFormRoot.ValueField = () => (
	<FormInput name="value" label="Value" placeholder="Value" />
);

OptionFormRoot.Actions = ({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div className={cn("flex gap-4 ml-auto mr-0 mt-4", className)} {...props} />
	);
};

OptionFormRoot.SaveAction = (props: ButtonProps) => {
	return (
		<Button size="lg" type="submit" {...props}>
			Save Option
		</Button>
	);
};

OptionFormRoot.CancelAction = (props: ButtonProps) => {
	return (
		<Button size="lg" variant="outline" {...props}>
			Cancel
		</Button>
	);
};

const OptionForm = OptionFormRoot;

export { OptionForm };
