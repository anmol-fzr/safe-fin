import type { ViewProps } from "react-native";
import Animated, {
	type AnimatedProps,
	FadeIn,
	FadeOut,
} from "react-native-reanimated";

export function ViewTransition(props: AnimatedProps<ViewProps>) {
	const { children, entering = FadeIn, exiting = FadeOut, ...rest } = props;

	return (
		<Animated.View {...{ entering, exiting }} {...rest}>
			{children}
		</Animated.View>
	);
}
