import { useLowPowerMode } from "expo-battery";
import { useEffect } from "react";
import { useMMKVBoolean } from "react-native-mmkv";
import { isLowEndDevice } from "@/utils/funcs";
import { storage } from "@/utils/storage";

export const useDisableAnimations = () => {
	const [animationsEnabled, setAnimationsEnabled] = useMMKVBoolean(
		"animations-enabled",
		storage,
	);
	const isOnLowPower = useLowPowerMode();

	useEffect(() => {
		if (animationsEnabled === undefined) {
			const isLowEnd = isLowEndDevice();
			setAnimationsEnabled(!isLowEnd);
		}
	}, [animationsEnabled, setAnimationsEnabled]);

	const disableAnimations = isOnLowPower || animationsEnabled !== false;

	const isDisabledOnLowPower = isOnLowPower;

	const toggleAnimations = () => setAnimationsEnabled((curr) => !curr);

	return {
		disableAnimations,
		isDisabledOnLowPower,
		toggleAnimations,
		enableAnimations: () => setAnimationsEnabled(true),
		disableAnimationsManually: () => setAnimationsEnabled(false),
		setAnimations: setAnimationsEnabled,
	};
};
