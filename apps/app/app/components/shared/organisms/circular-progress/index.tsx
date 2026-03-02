import type React from "react";
import { memo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { Circle, type CircleProps, Svg } from "react-native-svg";
import { useAppTheme } from "@/utils/useAppTheme";
import type { ICircularProgress } from "./types";

const AnimatedCircle = Animated.createAnimatedComponent<CircleProps>(Circle);

export const CircularProgress: React.FC<ICircularProgress> =
	memo<ICircularProgress>((props: ICircularProgress): React.ReactNode => {
		const { theme } = useAppTheme();

		const {
			progress,
			size = 50,
			strokeWidth = 3,
			outerCircleColor = theme.colors.palette.neutral800,
			progressCircleColor = theme.colors.palette.primary500,
			onPress,
		} = props;

		const radius = (size - strokeWidth) / 2;
		const circum = radius * 2 * Math.PI;

		const circleAnimatedProps = useAnimatedProps<
			Pick<CircleProps, "strokeDashoffset">
		>(() => {
			const progressValue = Math.min(Math.max(progress.value, 0), 100);
			const strokeDashoffset = circum * (1 - progressValue / 100);
			return {
				strokeDashoffset,
			};
		});

		return (
			<Pressable onPress={onPress}>
				<View style={{ width: size, height: size }}>
					<Svg width={size} height={size}>
						<Circle
							stroke={outerCircleColor}
							fill="none"
							cx={size / 2}
							cy={size / 2}
							r={radius}
							strokeWidth={strokeWidth}
						/>
						<AnimatedCircle
							stroke={progressCircleColor}
							fill="none"
							cx={size / 2}
							cy={size / 2}
							r={radius}
							strokeDasharray={`${circum} ${circum}`}
							strokeLinecap="round"
							transform={`rotate(-90, ${size / 2}, ${size / 2})`}
							strokeWidth={strokeWidth}
							animatedProps={circleAnimatedProps}
						/>
					</Svg>
					{/*
					<View
						style={[
							styles.innerCircle,
							{
								width: innerCircleSize,
								height: innerCircleSize,
								backgroundColor,
								top: innerCirclePosition,
								left: innerCirclePosition,
							},
						]}
					>
						{renderIcon ? (
							renderIcon()
						) : (
							<View
								style={{
									width: innerCircleSize * 0.5,
									height: innerCircleSize * 0.5,
									backgroundColor: "#fff",
								}}
							/>
						)}
					</View>
        */}
				</View>
			</Pressable>
		);
	});

const styles = StyleSheet.create({
	innerCircle: {
		position: "absolute",
		borderRadius: 100,
		justifyContent: "center",
		alignItems: "center",
	},
});
