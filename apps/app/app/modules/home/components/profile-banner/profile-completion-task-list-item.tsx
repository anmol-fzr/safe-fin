import { LinearGradient } from "expo-linear-gradient";
import type { Icon as IconType } from "iconsax-react-nativejs";
import { View } from "react-native";
import Animated, { FadeIn, FadeInUp, FadeOut } from "react-native-reanimated";
import { Text } from "@/components";
import { IconSax } from "@/context/IconContext";
import { makeSpringy } from "@/theme";
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
		theme: { colors, spacing, roundness },
	} = useAppTheme();

	return (
		<Animated.View
			entering={makeSpringy(FadeInUp).delay(100 * index)}
			exiting={makeSpringy(FadeOut).delay(500)}
			style={{
				flexDirection: "row",
				gap: spacing.sm,
				alignItems: "center",
			}}
		>
			<View
				style={{
					position: "relative",
				}}
			>
				<View
					style={{
						backgroundColor: task.isComplete
							? colors.successBackground
							: colors.background,
						borderRadius: roundness * 2,
						borderWidth: 2,
						borderColor: task.isComplete
							? colors.successBackground
							: colors.border,
						padding: spacing.xs,
						zIndex: 2,
					}}
				>
					<IconSax
						icon={task.icon}
						size={18}
						color={task.isComplete ? colors.success : undefined}
					/>
				</View>
				{index !== taskLength - 1 && (
					<Animated.View entering={FadeIn.delay(100 * taskLength)}>
						<LinearGradient
							colors={[
								task.isComplete ? colors.success : colors.border,
								tasks[index + 1].isComplete
									? colors.success
									: task.isComplete
										? colors.successBackground
										: colors.border,
							]}
							start={{ x: 0, y: 0 }}
							end={{ x: 0, y: 0.6 }}
							style={{
								zIndex: 0,
								position: "absolute",
								height: 50,
								width: 4,
								top: "50%",
								left: "50%",
								transform: [{ translateX: -2 }], // width / 2
							}}
						/>
					</Animated.View>
				)}
			</View>

			<View>
				<Text
					weight="medium"
					style={{
						color: task.isComplete ? colors.success : colors.text,
					}}
				>
					{task.title}{" "}
				</Text>

				<Text size="xs" color="dim">
					{task.subtitle}
				</Text>
			</View>
		</Animated.View>
	);
}
