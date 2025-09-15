import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useYupForm } from "@/hooks/form/useYupForm";
import { getPhraseSchema } from "@/schema/phrase.schema";
import { FormInput } from "../form/form-input";
import { Form } from "../ui/form";
import { useDeleteUser } from "@/hooks/api/user";

export interface DeleteDialogProps {
	userId: string;
	isOpen: boolean;
	onClose: VoidFunction;
}

export function UserDeleteDialog({
	userId = "",
	isOpen = false,
	onClose,
}: DeleteDialogProps) {
	const phrase = `user/${userId?.slice(0, 5).toLowerCase()}`;
	const schema = getPhraseSchema(phrase);
	const form = useYupForm({ schema });

	const { deleteUser } = useDeleteUser();

	const handleSubmit = form.handleSubmit(() => {
		deleteUser(userId);
	});

	if (!isOpen) return <></>;

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Delete User ?</DialogTitle>
					<DialogDescription>
						This will permanently delete the User.
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
