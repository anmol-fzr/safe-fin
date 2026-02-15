import { ViewProps } from "react-native";
import Animated, {
	AnimatedProps,
	interpolateColor,
	useAnimatedStyle,
} from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-worklets";
import * as Haptics from "expo-haptics";
import { useAppTheme } from "@/utils/useAppTheme";
import { ThemedViewStyle } from "@/theme";
import { usePressProgressTap, useProgresFromBoolean } from "@/hooks/reanimated";

export interface GamifiedButtonProps extends AnimatedProps<ViewProps> {
	onPress?: VoidFunction;
	isActive?: boolean;
}

export const GamifiedButton = (props: GamifiedButtonProps) => {
	const {
		isActive = false,
		onPress = () => {},
		style: $styleOverride,
		...rest
	} = props;

	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	const { progress: pressProgress, gesture } = usePressProgressTap();
	const activeProgress = useProgresFromBoolean(isActive);

	const pressedStyle = useAnimatedStyle(() => ({
		marginTop: pressProgress.value * 4,
		borderBottomWidth: 5 - pressProgress.value * 4,
	}));

	const activeStyle = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(
			activeProgress.value,
			[0, 1],
			[colors.palette.neutral200, colors.palette.primary300],
		),
		borderColor: interpolateColor(
			activeProgress.value,
			[0, 1],
			[colors.palette.neutral300, colors.tint],
		),
	}));

	const handlePress = () => {
		Haptics.selectionAsync();
		onPress?.();
	};

	const tap = gesture.onEnd(() => {
		runOnJS(handlePress)();
	});

	return (
		<GestureDetector gesture={tap}>
			<Animated.View
				style={[themed($buttonRoot), activeStyle, pressedStyle, $styleOverride]}
				{...rest}
			/>
		</GestureDetector>
	);
};

const $buttonRoot: ThemedViewStyle = (theme) => ({
	padding: theme.spacing.sm,
	borderRadius: theme.spacing.xs,
	borderWidth: 1,
});
