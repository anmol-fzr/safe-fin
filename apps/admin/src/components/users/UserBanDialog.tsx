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
import { FormInput } from "../form/form-input";
import * as Yup from "yup";
import { useYupForm } from "@/hooks/form/useYupForm";
import { Form } from "@/components/ui/form";
import { authClient } from "@/lib/auth";

const schema = Yup.object({
	banReason: Yup.string().required().label("Ban Reason"),
});

export interface DeleteDialogProps {
	isOpen: boolean;
	userId: string;
	onClose: VoidFunction;
}

export function UserBanDialog({
	userId,
	isOpen = false,
	onClose,
}: DeleteDialogProps) {
	const form = useYupForm({ schema });

	const handleSubmit = form.handleSubmit(async (values) => {
		await authClient.admin.banUser({
			banReason: values.banReason,
			userId,
		});
	});

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
					<DialogTitle>Ban User</DialogTitle>
					<DialogDescription>
						This will permanently ban User, User won't be able to login.
						<br />
						Are You Sure about this ?
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4">
					<Form {...form} onSubmit={handleSubmit} className="flex-col">
						<FormInput
							name="banReason"
							label="Ban Reason"
							placeholder="Illegal Activities"
						/>

						<DialogFooter className="mt-4">
							<Button type="submit" variant="ghost" tabIndex={-1}>
								Ban
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
