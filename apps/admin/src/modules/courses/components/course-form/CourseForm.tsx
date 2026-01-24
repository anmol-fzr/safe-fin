import {
	type ComponentPropsWithoutRef,
	type PropsWithChildren,
	useCallback,
	useRef,
} from "react";
import {
	Controller,
	FormProvider,
	type UseFormReturn,
	useFormContext,
} from "react-hook-form";
import { DraftPublishSwitch } from "@/components/DraftPublishSwitch";
import { FormEditor } from "@/components/form/form-editor";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { ImageUploader } from "@/components/image-uploader";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { uploadMedia } from "@/services/api";

type CourseFormRootProps = PropsWithChildren & {
	form: UseFormReturn;
	handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
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
	<FormInput
		name="title"
		label="Course Title"
		placeholder="e.g. Financial Basics 101"
	/>
);
const CourseFormDescField = () => (
	<FormTextarea
		name="desc"
		label="Short Summary"
		placeholder="Briefly Describe Content of the Course"
	/>
);

const courseLevelOpts = [
	{ label: "Beginner", value: "beginner" },
	{ label: "Intermediate", value: "intermediate" },
	{ label: "Advanced", value: "advanced" },
];

const CourseFormLevelSelect = () => (
	<FormSelect
		className="w-full"
		options={courseLevelOpts}
		name="level"
		label="Course Level"
		placeholder="Difficulty Level of the Course"
	/>
);

const CourseFormPublishSwitch = DraftPublishSwitch;

const CourseFormCoverImageField = () => {
	const { control, setValue } = useFormContext();

	return (
		<Controller
			control={control}
			name="coverImage"
			render={({ field, fieldState }) => (
				<ImageUploader
					value={field.value}
					onChange={field.onChange}
					errorMessage={fieldState.error?.message}
					uploadFn={async (file) => {
						const { fileUrl, publicUrl } = await uploadMedia(file);

						setValue("coverPath", fileUrl);
						return publicUrl;
					}}
					aspectRatio={16 / 9}
					acceptedFileTypes={["image/png", "image/jpeg", "image/webp"]}
				/>
			)}
		/>
	);
};

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
		<div className={cn("w-full max-w-5xl", className)}>
			<FormEditor name="content" label="Course Content" />
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
	LevelSelect: CourseFormLevelSelect,
	PublishSwitch: CourseFormPublishSwitch,
	CoverImageField: CourseFormCoverImageField,
	Actions: CourseFormActions,
	DraftAction: CourseFormDraftAction,
	PublishAction: CourseFormPublishAction,
	SaveAction: CourseFormSaveAction,
};

export { CourseForm };
