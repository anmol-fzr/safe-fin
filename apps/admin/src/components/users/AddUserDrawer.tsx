import { useState } from "react";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { AddUserForm } from "./AddUserForm";
import { AddButton } from "../form/button/AddButton";

const doNothing = () => {};

export const AddUserDrawer = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
			<DrawerTrigger asChild>
				<AddButton onClick={doNothing} resource="User" />
			</DrawerTrigger>
			<DrawerContent className="w-md rounded-none">
				<DrawerHeader>
					<DrawerTitle>Are you absolutely sure?</DrawerTitle>
					<DrawerDescription>This action cannot be undone.</DrawerDescription>
				</DrawerHeader>

				<AddUserForm onClose={() => setIsOpen(false)} />

				<DrawerFooter>
					<DrawerClose>
						<Button variant="outline" className="!w-full">
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
