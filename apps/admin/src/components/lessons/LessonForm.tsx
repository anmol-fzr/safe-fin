import { useCallback, useRef } from "react";
import { FormProvider } from "react-hook-form";
import { FormEditor } from "@/components/form/form-editor";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import type { useYupForm } from "@/hooks/form/useYupForm";
import type { ResourceId } from "@/services/api/types";
import { Form, type FormSubmitHandler } from "../ui/form";

type UpdateLessonFormProps = {
	lessonId: ResourceId;
	form: ReturnType<typeof useYupForm>;
	handleSubmit: FormSubmitHandler;
	handlePublish: VoidFunction;
	handleDraft: VoidFunction;
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

export function LessonForm({
	form,
	handleSubmit,
	handlePublish,
	handleDraft,
}: UpdateLessonFormProps) {
	return (
		<Form {...form} className="flex gap-6 mx-auto" onSubmit={handleSubmit}>
			<FormProvider {...form}>
				<div className="w-full max-w-screen-lg ">
					<FormEditor name="content" />
				</div>
				<div className="w-full max-w-md space-y-4">
					<FormInput name="title" label="Title" placeholder="Title" />
					<FormTextarea
						name="desc"
						label="Description"
						placeholder="Description"
					/>
					<div className="flex gap-4 ml-auto mr-0 mt-4">
						<Button variant="outline" size="lg" onClick={handlePublish}>
							Publish
						</Button>
						<Button size="lg" onClick={handleDraft}>
							Save Draft
						</Button>
					</div>
				</div>
			</FormProvider>
		</Form>
	);
}
