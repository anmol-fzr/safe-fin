import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormProvider } from "react-hook-form";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormEditor } from "@/components/form/form-editor";
import { newLessonSchema } from "@/schema/lesson";
import { useYupForm } from "@/hooks/form/useYupForm";
import { useCreateLesson } from "@/hooks/api/lesson";
import { renderToMarkdown } from "@tiptap/static-renderer";
import { extensions } from "../editor/Editor";

type Action = "publish" | "draft";

export function LessonForm() {
	const form = useYupForm({ schema: newLessonSchema });
	const actionRef = useRef<Action>("publish");
	const { createLesson } = useCreateLesson();

	const handleSubmit = form.handleSubmit((values) => {
		//const draft = actionRef.current === "draft";

		const json = values.content;
		const markdown = renderToMarkdown({ content: json, extensions });

		console.log({
			...values,
			content: markdown,
			contentJson: JSON.stringify(json),
		});

		createLesson({
			...values,
			content: markdown,
			contentJson: JSON.stringify(json),
		});
	});

	const toPublish = () => (actionRef.current = "publish");
	const toDraft = () => (actionRef.current = "draft");

	return (
		<Form
			control={form.control}
			className="flex gap-6 mx-auto"
			onSubmit={handleSubmit}
		>
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
						<Button variant="outline" size="lg" onClick={toPublish}>
							Publish
						</Button>
						<Button size="lg" onClick={toDraft}>
							Save Draft
						</Button>
					</div>
				</div>
			</FormProvider>
		</Form>
	);
}
