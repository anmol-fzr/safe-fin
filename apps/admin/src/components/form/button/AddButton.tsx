import { Button, type ButtonProps } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Plus } from "lucide-react";
import {
	Link,
	useNavigate,
	type LinkComponentProps,
} from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Shortcut } from "@/components/Shortcut";

type AddButtonProps = ButtonProps & {
	to: LinkComponentProps["to"];
	keyBind?: string;
	resource: string;
};

export function AddButton({
	keyBind = "a",
	to,
	resource,
	...props
}: AddButtonProps) {
	const navigate = useNavigate();
	const shortcutsEnabled = useSettingsStore((state) => state.shortcuts.enabled);

	useHotkeys(
		keyBind,
		() => {
			navigate({ to });
		},
		{ enabled: shortcutsEnabled },
	);

	return (
		<Button {...props} asChild>
			<Link to={to}>
				<Plus /> Add {resource}
				<Shortcut>{keyBind}</Shortcut>
			</Link>
		</Button>
	);
}
