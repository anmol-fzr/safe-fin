import { useCallback } from "react";
import { toast } from "sonner-native";
import { Switch } from "@/components";
import { Field } from "@/components/Field";
import { useDisableAnimations } from "@/hooks/use-disable-animations";

export function AnimationSwitch() {
	const { isDisabledOnLowPower, disableAnimations, setAnimations } =
		useDisableAnimations();

	const onAnimationChange = useCallback(
		(val: boolean) => {
			if (isDisabledOnLowPower) {
				toast.error(
					"Animations cannot be enabled while Low Power Mode is active.",
					{
						id: "animation-config",
					},
				);
				return;
			}
			setAnimations(!val);
		},
		[setAnimations, isDisabledOnLowPower],
	);

	return (
		<Field>
			<Field.Label text="Enable Animations" />
			<Switch value={!disableAnimations} onValueChange={onAnimationChange} />
			<Field.Helper
				text={
					isDisabledOnLowPower
						? "Animations are temporarily disabled because your device is in Low Power Mode to save battery."
						: disableAnimations
							? "Animations are disabled"
							: "Animations are enabled"
				}
				color="dim"
				size="xs"
			/>
		</Field>
	);
}
