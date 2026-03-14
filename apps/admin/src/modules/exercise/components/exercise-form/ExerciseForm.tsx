import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import {
	FormProvider,
	useFormContext,
	type UseFormReturn,
} from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Form, type FormSubmitHandler } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { DraftPublishSwitch } from "@/components/DraftPublishSwitch";
import { useGetChapter } from "@/modules/courses/hooks/queries";

export type ExerciseFormRootProps = PropsWithChildren & {
	form: UseFormReturn;
	// form: UseFormReturn<{
	// 	title: string;
	// 	desc: string;
	// 	isPublished: string;
	// }>;
	handleSubmit: FormSubmitHandler;
	className?: string;
};

function ExerciseFormRoot({
	form,
	handleSubmit,
	className,
	children,
}: ExerciseFormRootProps) {
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

ExerciseFormRoot.TitleField = () => (
	<FormInput
		name="title"
		label="Title"
		placeholder="Enter a clear title for the exercise (e.g., Chapter 1 Knowledge Check)"
	/>
);

ExerciseFormRoot.DescField = () => (
	<FormTextarea
		name="desc"
		label="Description"
		placeholder="Briefly describe what this exercise tests or reinforces"
	/>
);

ExerciseFormRoot.ChapterIdField = () => {
	const form = useFormContext();
	const chapterId = form.watch("chapterId");

	const { chapter, isLoading, isError, error } = useGetChapter(chapterId);

	return (
		<div>
			<FormInput
				type="number"
				name="chapterId"
				label="Chapter Id"
				placeholder="Paste the chapter this exercise belongs to"
			/>
			{isLoading ? (
				"Searching Chapter"
			) : chapterId ? (
				chapter ? (
					<p>
						{chapter?.title} ( from {chapter?.course.content.title})
					</p>
				) : isError ? (
					error.error
				) : (
					"Something Went Wrong"
				)
			) : (
				""
			)}
		</div>
	);
};

ExerciseFormRoot.PublishSwitch = DraftPublishSwitch;

ExerciseFormRoot.Actions = ({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) => {
	return (
		<div className={cn("flex gap-4 ml-auto mr-0 mt-4", className)} {...props} />
	);
};

ExerciseFormRoot.SaveAction = (props: ButtonProps) => {
	return (
		<Button size="lg" type="submit" {...props}>
			Save Exercise
		</Button>
	);
};

ExerciseFormRoot.CancelAction = (props: ButtonProps) => {
	return (
		<Button size="lg" variant="outline" {...props}>
			Cancel
		</Button>
	);
};

const ExerciseForm = ExerciseFormRoot;

export { ExerciseForm };
