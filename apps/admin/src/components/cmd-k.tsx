import type { LinkComponentProps } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useCommandState } from "cmdk";
import type { LucideIcon } from "lucide-react";
import { Brain, CircleQuestionMark, Settings, Sun, Users } from "lucide-react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { createContext, useEffect, useState } from "react";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useSafeContext } from "@/context/helper";
import { Card } from "./ui/card";
import { Book } from "iconsax-reactjs";

type ListItem = {
	icon: LucideIcon;
	label: string;
	to: LinkComponentProps["to"];
	shortDec: string;
	desc: string;
};
type List = {
	title: string;
	list: ListItem[];
}[];

const list: List = [
	{
		title: "Navigation",
		list: [
			{
				icon: Book,
				label: "Courses",
				to: "/dashboard/courses",
				shortDec: "Create, Update, Delete, Manage -- Lessons",
				desc: "Create, Update, Delete, Manage -- Lessons",
			},
			{
				icon: CircleQuestionMark,
				label: "Exercises",
				to: "/dashboard/exercises",
				shortDec: "Create, Update, Delete, Manage -- Quizzes",
				desc: "Create, Update, Delete, Manage -- Quizzes",
			},
			{
				icon: Settings,
				label: "Settings",
				to: "/dashboard/settings",
				shortDec: "Manage Settings",
				desc: "Manage Settings",
			},
		],
	},
	{
		title: "Actions",
		list: [
			{
				icon: Sun,
				label: "Toggle Theme",
				to: "/dashboard/exercises",
				shortDec: "Toggle Theme",
				desc: "Toggle Theme",
			},
		],
	},
];

const map = new Map<ListItem["label"], ListItem>();

list.forEach((lists) => {
	lists.list.forEach((list) => {
		map.set(list.label, list);
	});
});

type ICmdkContext = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

const cmdkContext = createContext<ICmdkContext | null>(null);

const CmdkContext = cmdkContext.Provider;

export const CmdKProvider = ({ children }: PropsWithChildren) => {
	const [open, setOpen] = useState(false);

	return <CmdkContext value={{ open, setOpen }}>{children}</CmdkContext>;
};

export const useCmdk = () => {
	return useSafeContext(cmdkContext, "useCmdk", "CmdkContext");
};

export function CmdK() {
	const { open, setOpen } = useCmdk();

	useEffect(() => {
		const handleAltKPress = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", handleAltKPress);
		return () => document.removeEventListener("keydown", handleAltKPress);
	}, [setOpen]);

	return (
		<CommandDialog
			open={open}
			onOpenChange={setOpen}
			className="!min-w-[750px]"
		>
			<CommandInput placeholder="Type a command or search..." />
			<CommandContent />
		</CommandDialog>
	);
}

function CommandContent() {
	const selected = useCommandState((state) => state.value);

	return (
		<CommandList className="min-h-[500px]">
			<CommandEmpty>No results found.</CommandEmpty>
			<div className="flex !h-[500px]">
				<div className="flex-1 pr-1 border-r !h-full">
					{list.map((list) => (
						<CommandGroup heading={list.title} key={list.title}>
							<CmdkListItem list={list.list} />
						</CommandGroup>
					))}
				</div>

				{selected && <CmdkDetails selected={selected} />}
			</div>
		</CommandList>
	);
}

function CmdkDetails({ selected }: { selected: string }) {
	return (
		<div className="!min-w-[450px] w-[450px] p-2">
			<Card className="bg-sidebar p-4">{map.get(selected)?.desc}</Card>
		</div>
	);
}

type CmdkListItemProps = {
	list: ListItem[];
};

function CmdkListItem({ list }: CmdkListItemProps) {
	return list.map((item) => <CmdkItem key={item.label} {...item} />);
}

function CmdkItem({ label, icon: Icon }: ListItem) {
	const { setOpen } = useCmdk();
	const navigate = useNavigate();
	return (
		<CommandItem
			onSelect={(val) => {
				const to = map.get(val)?.to;
				if (to) {
					setOpen(false);
					setTimeout(() => {
						navigate({
							to,
						});
					}, 0);
				}
			}}
		>
			<Icon />
			<span>{label}</span>
		</CommandItem>
	);
}
