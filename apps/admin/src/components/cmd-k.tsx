import * as React from "react";
import { Sun, CircleQuestionMark, Brain, Users, Settings } from "lucide-react";
import type { LinkComponentProps } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useCommandState } from "cmdk";
import type { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

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
				icon: Users,
				label: "Users",
				to: "/dashboard/users",
				shortDec: "Create, List, Ban, Unban Impersonate, Manage Access",
				desc: "Create, List, Ban, Unban Impersonate, Manage -- Users",
			},
			{
				icon: Brain,
				label: "Lessons",
				to: "/dashboard/lessons",
				shortDec: "Create, Update, Delete, Manage -- Lessons",
				desc: "Create, Update, Delete, Manage -- Lessons",
			},
			{
				icon: CircleQuestionMark,
				label: "Quizzes",
				to: "/dashboard/quiz",
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
				to: "/dashboard/quiz",
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

const cmdkContext = React.createContext({
	open: false,
	setOpen: (_open) => {},
});
const CmdkContext = cmdkContext.Provider;

export function CmdK() {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<CmdkContext value={{ open, setOpen }}>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
				className="!min-w-[750px]"
			>
				<CommandInput placeholder="Type a command or search..." />
				<Stuff />
			</CommandDialog>
		</CmdkContext>
	);
}
function Stuff() {
	const selected = useCommandState((state) => state.value);
	const navigate = useNavigate();
	const { setOpen } = React.useContext(cmdkContext);

	return (
		<CommandList className="min-h-[500px]">
			<CommandEmpty>No results found.</CommandEmpty>
			<div className="flex !h-[500px]">
				<div className="flex-1 pr-1 border-r !h-full">
					{list.map((list) => (
						<CommandGroup heading={list.title} key={list.title}>
							{list.list.map((item) => (
								<CommandItem
									key={item.label}
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
									<item.icon />
									<span>{item.label}</span>
								</CommandItem>
							))}
						</CommandGroup>
					))}
				</div>

				{selected && <CommandSelectedDetail selected={selected} />}
			</div>
		</CommandList>
	);
}

function CommandSelectedDetail({ selected }: { selected: string }) {
	return (
		<div className="!min-w-[450px] w-[450px] p-2">
			<Card className="bg-sidebar p-4">{map.get(selected)?.desc}</Card>
		</div>
	);
}
