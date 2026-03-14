import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { useCallback, useRef } from "react";
import { FormProvider, type UseFormReturn } from "react-hook-form";
import { FormEditor } from "@/components/form/form-editor";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Form, type FormSubmitHandler } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type UnitFormRootProps = PropsWithChildren & {
	form: UseFormReturn;
	handleSubmit: FormSubmitHandler;
	className?: string;
};

type Action = "publish" | "draft";

export const useUnitActionFormRef = () => {
	const ref = useRef<Action>("publish");

	const toPublish = useCallback(() => {
		ref.current = "publish";
	}, []);

	const toDraft = useCallback(() => {
		ref.current = "draft";
	}, []);

	return { ref, toDraft, toPublish };
};

function UnitFormRoot({
	form,
	handleSubmit,
	className,
	children,
}: UnitFormRootProps) {
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

const UnitFormTitleField = () => (
	<FormInput name="title" label="Title" placeholder="Title" />
);
const UnitFormDescField = () => (
	<FormTextarea
		name="shortDesc"
		label="Description"
		placeholder="Description"
	/>
);

const UnitFormPointsField = () => (
	<FormInput type="number" name="points" label="Points" placeholder="250" />
);

const UnitFormEditor = ({ className }: { className?: string }) => {
	return (
		<div className={cn("w-full max-w-5xl", className)}>
			<FormEditor name="content" />
		</div>
	);
};

const UnitFormActions = ({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div className={cn("flex gap-4 ml-auto mr-0 mt-4", className)} {...props} />
	);
};

const UnitFormSaveAction = (props: ButtonProps) => {
	return (
		<Button size="lg" type="submit" {...props}>
			Save Unit
		</Button>
	);
};

const UnitFormCancelAction = (props: ButtonProps) => {
	return (
		<Button size="lg" variant="outline" {...props}>
			Cancel
		</Button>
	);
};

const UnitForm = {
	Root: UnitFormRoot,
	Editor: UnitFormEditor,
	TitleField: UnitFormTitleField,
	DescField: UnitFormDescField,
	PointsField: UnitFormPointsField,
	Actions: UnitFormActions,
	SaveAction: UnitFormSaveAction,
	CancelAction: UnitFormCancelAction,
};

export { UnitForm };
