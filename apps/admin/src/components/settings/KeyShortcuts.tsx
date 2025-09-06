import { memo, type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Kbd } from "../ui/kbd";

type OnlyChild = {
	children: ReactNode;
};

const shortcuts = [
	{
		title: "Toggle Theme",
		keys: ["alt", "t"],
	},
	{
		title: "Toggle Sidebar",
		keys: ["ctrl", "b"],
	},
	{
		title: "Global Search",
		keys: ["ctrl", "k"],
	},
	{
		title: "Search in Table",
		keys: ["/"],
	},
	{
		title: "Add New Record in Table",
		keys: ["a"],
	},
] as const;

export const KeyShortcuts = memo(({ className }: { className: string }) => {
	return (
		<Card className={cn("max-w-96", className)}>
			<CardHeader>
				<CardTitle>Keyboard Shortcuts</CardTitle>
			</CardHeader>
			<CardContent>
				<Shortcuts />
			</CardContent>
		</Card>
	);
});

const Shortcuts = memo(() => {
	return (
		<div className="space-y-3">
			{shortcuts.map((shortcut) => (
				<Shortcut shortcut={shortcut} key={shortcut.title} />
			))}
		</div>
	);
});

type ShortcutProps = {
	shortcut: (typeof shortcuts)[0];
};

const Shortcut = memo(({ shortcut }: ShortcutProps) => {
	return (
		<div className="flex justify-between items-center">
			<p>{shortcut.title}</p>
			<Keys keys={shortcut.keys} />
		</div>
	);
});

type KeysProps = {
	keys: (typeof shortcuts)[0]["keys"];
};

const Keys = memo(({ keys }: KeysProps) => {
	return (
		<div className="flex items-center gap-2">
			{keys.map((key) => (
				<Kbd key={key} className="text-sm">
					{key}
				</Kbd>
			))}
		</div>
	);
});

const Key = memo(({ children }: OnlyChild) => (
	<p className="bg-muted w-fit py-1 px-3 rounded-md capitalize">{children}</p>
));
