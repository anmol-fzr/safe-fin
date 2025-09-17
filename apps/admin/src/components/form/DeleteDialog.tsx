import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useYupForm } from "@/hooks/form/useYupForm";
import { getPhraseSchema } from "@/schema/phrase.schema";
import { FormInput } from "./form-input";

export interface DeleteDialogProps {
	onDelete: VoidFunction;
	children: ReactNode;
	phrase: string;
}

export function DeleteDialog({
	onDelete,
	children,
	phrase,
}: DeleteDialogProps) {
	const schema = getPhraseSchema(phrase);

	const form = useYupForm({ schema });

	const handleSubmit = form.handleSubmit(onDelete);

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Delete {phrase}</DialogTitle>
					<DialogDescription>
						This will permanently delete the {phrase} Lesson.
						<br />
						Are You Sure about this ?
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<Form {...form} onSubmit={handleSubmit} className="flex-col">
						<FormInput
							name="name"
							label={`To confirm, type "${phrase}" below`}
							placeholder=""
						/>

						<DialogFooter className="mt-4">
							<Button type="submit" variant="ghost">
								Delete
							</Button>
							<DialogClose asChild>
								<Button>Cancel</Button>
							</DialogClose>
						</DialogFooter>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
