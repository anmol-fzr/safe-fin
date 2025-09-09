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
import { FormInput } from "./form-input";
import type { ReactNode } from "react";
import * as Yup from "yup";
import { useYupForm } from "@/hooks/form/useYupForm";
import { Form } from "@/components/ui/form";

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
	const schema = Yup.object({
		deleteName: Yup.string()
			.matches(new RegExp(phrase), {
				excludeEmptyString: true,
				message: `Must match ${phrase}`,
			})
			.required("Please: Type to Confirm Deletion"),
	});

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
							name="deleteName"
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
