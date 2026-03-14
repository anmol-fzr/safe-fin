import { useEffect } from "react";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

const loadingFlower = require("assets/images/loading/flower.png");

export function CircularProgressIndicator() {
	const offset = useSharedValue(0);

	const animatedStyles = useAnimatedStyle(() => ({
		rotation: offset.value,
	}));

	useEffect(() => {
		offset.value = withRepeat(
			withTiming(offset.value + 120, { duration: 750, easing: Easing.linear }),
			-1,
		);
	}, [offset]);

	return <Animated.Image source={loadingFlower} style={animatedStyles} />;
}
