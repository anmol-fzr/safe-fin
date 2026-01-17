import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { useCallback, useRef } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { FormEditor } from "@/components/form/form-editor";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Form, type FormSubmitHandler } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type CourseFormRootProps = PropsWithChildren & {
	form: UseFormReturn;
	handleSubmit: FormSubmitHandler;
	className?: string;
};

type Action = "publish" | "draft";

export const useCourseActionFormRef = () => {
	const ref = useRef<Action>("publish");

	const toPublish = useCallback(() => {
		ref.current = "publish";
	}, []);

	const toDraft = useCallback(() => {
		ref.current = "draft";
	}, []);

	return { ref, toDraft, toPublish };
};

function CourseFormRoot({
	form,
	handleSubmit,
	className,
	children,
}: CourseFormRootProps) {
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

const CourseFormTitleField = () => (
	<FormInput name="title" label="Title" placeholder="Title" />
);
const CourseFormDescField = () => (
	<FormTextarea name="desc" label="Description" placeholder="Description" />
);

const CourseFormEditor = ({ className }: { className?: string }) => {
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

const CourseFormActions = ({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div className={cn("flex gap-4 ml-auto mr-0 mt-4", className)} {...props} />
	);
};

type CourseFormPublishActionProps = ButtonProps & {
	handlePublish: VoidFunction;
};

const CourseFormPublishAction = (props: CourseFormPublishActionProps) => {
	const { handlePublish, ...rest } = props;

	return (
		<Button variant="outline" size="lg" {...rest} onClick={handlePublish}>
			Publish
		</Button>
	);
};

type CourseFormDraftActionProps = ButtonProps & {
	handleDraft: VoidFunction;
};

const CourseFormDraftAction = (props: CourseFormDraftActionProps) => {
	const { handleDraft, ...rest } = props;
	return (
		<Button size="lg" {...rest} onClick={handleDraft}>
			Draft
		</Button>
	);
};

const CourseFormSaveAction = (props: ButtonProps) => {
	return (
		<Button size="lg" type="submit" {...props}>
			Save
		</Button>
	);
};

const CourseForm = {
	Root: CourseFormRoot,
	Editor: CourseFormEditor,
	TitleField: CourseFormTitleField,
	DescField: CourseFormDescField,
	Actions: CourseFormActions,
	DraftAction: CourseFormDraftAction,
	PublishAction: CourseFormPublishAction,
	SaveAction: CourseFormSaveAction,
};

export { CourseForm };
