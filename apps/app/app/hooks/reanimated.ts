import { useEffect } from "react";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue, withSpring } from "react-native-reanimated";

export const usePressProgressTap = () => {
	const progress = useSharedValue(0);

	const gesture = Gesture.Tap()
		.onBegin(() => {
			progress.value = withSpring(1);
		})
		.onFinalize(() => {
			progress.value = withSpring(0);
		});

	return { gesture, progress };
};

export const useProgresFromBoolean = (isActive = false) => {
	const progress = useSharedValue(isActive ? 1 : 0);

	useEffect(() => {
		progress.value = withSpring(isActive ? 1 : 0);
	}, [isActive]);

	return progress;
};
