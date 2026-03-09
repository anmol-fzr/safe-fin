import { useLowPowerMode } from "expo-battery";
import { useMMKVBoolean } from "react-native-mmkv";
import { storage } from "@/utils/storage";

export const useDisableAnimations = () => {
	const [animationsEnabled, setAnimationsEnabled] = useMMKVBoolean(
		"animations-enabled",
		storage,
	);

	const isOnLowPower = useLowPowerMode();

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
