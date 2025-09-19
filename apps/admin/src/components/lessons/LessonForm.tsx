import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { useCallback, useRef } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { FormEditor } from "@/components/form/form-editor";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Form, type FormSubmitHandler } from "../ui/form";

type LessonFormRootProps = PropsWithChildren & {
	form: UseFormReturn;
	handleSubmit: FormSubmitHandler;
	className?: string;
};

type Action = "publish" | "draft";

export const useLessonActionFormRef = () => {
	const ref = useRef<Action>("publish");

	const toPublish = useCallback(() => {
		ref.current = "publish";
	}, []);

	const toDraft = useCallback(() => {
		ref.current = "draft";
	}, []);

	return { ref, toDraft, toPublish };
};

function LessonFormRoot({
	form,
	handleSubmit,
	className,
	children,
}: LessonFormRootProps) {
	return (
		<Form
			{...form}
			className={cn("flex gap-6 mx-auto", className)}
			onSubmit={handleSubmit}
		>
			<FormProvider {...form}>{children}</FormProvider>
		</Form>
	);
}

const LessonFormTitleField = () => (
	<FormInput name="title" label="Title" placeholder="Title" />
);
const LessonFormDescField = () => (
	<FormTextarea name="desc" label="Description" placeholder="Description" />
);

const LessonFormEditor = ({ className }: { className?: string }) => {
	/*
			<div className="w-full max-w-md space-y-4">
				<FormInput name="title" label="Title" placeholder="Title" />
				<FormTextarea
					name="desc"
					label="Description"
					placeholder="Description"
				/>
			</div>
      */
	return (
		<div className={cn("w-full max-w-screen-lg ", className)}>
			<FormEditor name="content" />
		</div>
	);
};

const LessonFormActions = ({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div className={cn("flex gap-4 ml-auto mr-0 mt-4", className)} {...props} />
	);
};

type LessonFormPublishActionProps = ButtonProps & {
	handlePublish: VoidFunction;
};

const LessonFormPublishAction = (props: LessonFormPublishActionProps) => {
	const { handlePublish, ...rest } = props;

	return (
		<Button variant="outline" size="lg" {...rest} onClick={handlePublish}>
			Publish
		</Button>
	);
};

type LessonFormDraftActionProps = ButtonProps & {
	handleDraft: VoidFunction;
};

const LessonFormDraftAction = (props: LessonFormDraftActionProps) => {
	const { handleDraft, ...rest } = props;
	return (
		<Button size="lg" {...rest} onClick={handleDraft}>
			Draft
		</Button>
	);
};

const LessonForm = {
	Root: LessonFormRoot,
	Editor: LessonFormEditor,
	TitleField: LessonFormTitleField,
	DescField: LessonFormDescField,
	Actions: LessonFormActions,
	DraftAction: LessonFormDraftAction,
	PublishAction: LessonFormPublishAction,
};

export { LessonForm };
