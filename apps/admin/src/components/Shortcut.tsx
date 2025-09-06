import type { ComponentPropsWithoutRef } from "react";
import { Kbd } from "./ui/kbd";
import { useSettingsStore } from "@/store/useSettingsStore";

/**
 *
 * Wrapper over [Kbd] Component But reacts to the shortcut settings changes
 *
 * [Kbd] @see {@link ./ui/kbd.tsx}
 *
 * */
export function Shortcut(props: ComponentPropsWithoutRef<typeof Kbd>) {
	const enabled = useSettingsStore((state) => state.shortcuts.enabled);

	return enabled && <Kbd {...props} />;
}
