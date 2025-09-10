import { Button, type ButtonProps } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
	Link,
	useNavigate,
	type LinkComponentProps,
} from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Shortcut } from "@/components/Shortcut";

type BaseProps = ButtonProps & {
	keyBind?: string;
	resource: string;
	children?: React.ReactNode;
};

type ButtonOnlyProps = {
	onClick: VoidFunction;
	to?: never;
};

type LinkOnlyProps = {
	to: LinkComponentProps["to"];
	onClick?: never;
};

type AddButtonProps = BaseProps & (ButtonOnlyProps | LinkOnlyProps);

export function AddButton({
	keyBind = "a",
	to,
	onClick,
	resource,
	children,
	...props
}: AddButtonProps) {
	const navigate = useNavigate();
	const shortcutsEnabled = useSettingsStore((state) => state.shortcuts.enabled);

	useHotkeys(
		keyBind,
		() => {
			if (onClick) {
				onClick();
				return;
			}
			navigate({ to: to! });
		},
		{ enabled: shortcutsEnabled },
	);

	if (onClick) {
		return (
			<Button {...props} onClick={onClick}>
				{children ?? (
					<>
						<Plus /> Add {resource}
						<Shortcut>{keyBind}</Shortcut>
					</>
				)}
			</Button>
		);
	}

	return (
		<Button {...props} asChild>
			<Link to={to!}>
				<Plus /> Add {resource}
				<Shortcut>{keyBind}</Shortcut>
			</Link>
		</Button>
	);
}
