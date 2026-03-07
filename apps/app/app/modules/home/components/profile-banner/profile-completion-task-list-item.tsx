import { LinearGradient } from "expo-linear-gradient";
import type { Icon as IconType } from "iconsax-react-nativejs";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import { Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { $styles, makeSpringy, type ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export interface Item {
	title: string;
	subtitle: string;
	icon: IconType;
	isComplete: boolean;
}

interface ListItemProps {
	tasks: Item[];
	task: Item;
	index: number;
}

export function ProfileCompletionTaskListItem(props: ListItemProps) {
	const { task, index, tasks } = props;
	const taskLength = tasks.length;

	const {
		themed,
		theme: { colors, spacing, roundness },
	} = useAppTheme();

	const $iconColor = useMemo(
		() => (task.isComplete ? colors.success : colors.textDim),
		[task.isComplete, colors],
	);

	const $iconWrapper = useMemo(
		() => ({
			backgroundColor: task.isComplete
				? colors.successBackground
				: colors.background,
			borderRadius: roundness * 2,
			borderWidth: spacing.xxxs,
			borderColor: task.isComplete ? colors.successBackground : colors.border,
			padding: spacing.xs,
			zIndex: 2,
		}),
		[task.isComplete, spacing, roundness, colors],
	);

	const nextTask = tasks?.[index + 1];

	const gradientColors = useMemo(
		() =>
			[
				task.isComplete ? colors.success : colors.border,
				(nextTask?.isComplete ?? false)
					? colors.success
					: task.isComplete
						? colors.successBackground
						: colors.border,
			] as const,
		[colors, nextTask, task.isComplete],
	);

	return (
		<Animated.View
			entering={makeSpringy(FadeInUp).delay(100 * index)}
			exiting={makeSpringy(FadeOut).delay(500)}
			style={themed($root)}
		>
			<View style={styles.progressSideRoot}>
				<View style={$iconWrapper}>
					<IconSax icon={task.icon} size={18} color={$iconColor} />
				</View>
				{index !== taskLength - 1 && (
					<Animated.View entering={FadeIn.delay(100 * taskLength)}>
						<LinearGradient
							colors={gradientColors}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 0.6 }}
							style={styles.gradient}
						/>
					</Animated.View>
				)}
			</View>

			<View style={$styles.flex1}>
				<Text
					weight="medium"
					style={{
						color: task.isComplete ? colors.success : colors.text,
					}}
				>
					{task.title}
				</Text>

				<Text
					size="xs"
					color="dim"
					style={{
						flex: 1,
					}}
				>
					{task.subtitle}
				</Text>
			</View>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	gradient: {
		zIndex: 0,
		position: "absolute",
		height: 50,
		width: 4,
		top: "50%",
		left: "50%",
		transform: [{ translateX: -2 }], // width / 2
	},
	progressSideRoot: {
		position: "relative",
	},
});

const $root: ThemedViewStyle = (theme) => ({
	flexDirection: "row",
	gap: theme.spacing.sm,
});
