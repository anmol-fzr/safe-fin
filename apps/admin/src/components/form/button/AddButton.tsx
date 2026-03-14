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
import { useResource } from "@/context/resource.context";

type BaseProps = ButtonProps & {
	keyBind?: string;
	resource: string;
	children?: React.ReactNode;
	withKeyBind?: boolean;
};

type AddButtonProps = BaseProps & {
	onClick: VoidFunction;
};

export function AddButton({
	keyBind = "a",
	onClick,
	resource,
	children,
	withKeyBind,
	...props
}: AddButtonProps) {
	const enabled = useSettingsStore((state) => state.shortcuts.enabled);

	useHotkeys(keyBind, onClick, { enabled: withKeyBind ?? enabled });

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

type AddButtonLinkProps = Omit<BaseProps, "resource"> & {
	to: LinkComponentProps["to"];
};

export function AddButtonLink({
	keyBind = "a",
	to,
	children,
	withKeyBind,
	...props
}: AddButtonLinkProps) {
	const navigate = useNavigate();
	const enabled = useSettingsStore((state) => state.shortcuts.enabled);
	const { resource } = useResource();

	useHotkeys(
		keyBind,
		() => {
			navigate({ to });
		},
		{ enabled: withKeyBind ?? enabled },
	);

	return (
		<Button {...props} asChild>
			{children ?? (
				<Link to={to}>
					<Plus /> Add {resource}
					<Shortcut>{keyBind}</Shortcut>
				</Link>
			)}
		</Button>
	);
}
