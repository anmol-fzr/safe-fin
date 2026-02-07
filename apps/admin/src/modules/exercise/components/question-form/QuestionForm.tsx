import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Form, type FormSubmitHandler } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { DraftPublishSwitch } from "@/components/DraftPublishSwitch";

export type QuestionFormRootProps = PropsWithChildren & {
	form: UseFormReturn;
	handleSubmit: FormSubmitHandler;
	className?: string;
};

function QuestionFormRoot({
	form,
	handleSubmit,
	className,
	children,
}: QuestionFormRootProps) {
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

QuestionFormRoot.QuestionField = () => (
	<FormInput name="question" label="Question" placeholder="Question" />
);

QuestionFormRoot.ReasonField = () => (
	<FormTextarea name="reason" label="Reason" placeholder="Reason" />
);

QuestionFormRoot.PublishSwitch = DraftPublishSwitch;

QuestionFormRoot.Actions = ({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div className={cn("flex gap-4 ml-auto mr-0 mt-4", className)} {...props} />
	);
};

QuestionFormRoot.SaveAction = (props: ButtonProps) => {
	return (
		<Button size="lg" type="submit" {...props}>
			Save Question
		</Button>
	);
};

QuestionFormRoot.CancelAction = (props: ButtonProps) => {
	return (
		<Button size="lg" variant="outline" {...props}>
			Cancel
		</Button>
	);
};

const QuestionForm = QuestionFormRoot;

export { QuestionForm };
