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

export interface DeleteDialogProps {
	isOpen: boolean;
	onClose: VoidFunction;
}

export function UserDeleteDialog({
	isOpen = false,
	onClose,
}: DeleteDialogProps) {
	//const form = useYupForm({ schema });

	// const handleSubmit = form.handleSubmit(async (values) => {
	// 	await authClient.admin.banUser({
	// 		banReason: values.banReason,
	// 		userId: "q213",
	// 	});
	// });

	if (!isOpen) return <></>;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Delete User</DialogTitle>
					<DialogDescription>
						This will permanently delete User, User won't be able to login.
						<br />
						Are You Sure about this ?
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					{/*
					<Form {...form} onSubmit={handleSubmit} className="flex-col">
						<FormInput
							name="banReason"
							label="Ban Reason"
							placeholder="Illegal Activities"
						/>
					</Form>
          */}

					<DialogFooter className="mt-4">
						<Button type="submit" variant="ghost" tabIndex={-1}>
							Delete
						</Button>
						<DialogClose asChild>
							<Button>Cancel</Button>
						</DialogClose>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
