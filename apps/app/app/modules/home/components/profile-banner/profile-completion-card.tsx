import { Text } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";
import { Pressable, View } from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
} from "react-native-reanimated";
import { useToggle } from "@/pkg/ui";
import { makeSpringy } from "@/theme";
import { Item } from "./profile-completion-task-list-item";
import { ProfileCompletionTaskList } from "./profile-completion-task-list";
import { ProfileCompletionCTA } from "./profile-completion-cta";

export function ProfileCompletionCard({ tasks }: { tasks: Item[] }) {
	const {
		theme: { colors, spacing, roundness },
	} = useAppTheme();

	const { isOpen, onToggle } = useToggle();

	return (
		<Animated.View
			style={{
				backgroundColor: colors.palette.neutral200,
				padding: spacing.md,
				gap: spacing.sm,
				borderRadius: roundness,
				position: "relative",
			}}
			layout={makeSpringy(LinearTransition)}
		>
			<Pressable onPress={onToggle}>
				<View>
					<Text weight="bold" size="xl">
						Complete Your Profile
					</Text>
					<Text size="xs" style={{ color: colors.textDim }}>
						Unlock your full potential by completing your profile
					</Text>
				</View>
			</Pressable>
			{isOpen && (
				<Animated.View entering={FadeIn} exiting={FadeOut.duration(50)}>
					<ProfileCompletionTaskList tasks={tasks} />
					<ProfileCompletionCTA />
				</Animated.View>
			)}
		</Animated.View>
	);
}
