import { Pressable, View } from "react-native";
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
} from "react-native-reanimated";
import { Text } from "@/components";
import { useToggle } from "@/pkg/ui";
import { makeSpringy, type ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { ProfileCompletionCTA } from "./profile-completion-cta";
import { ProfileCompletionTaskList } from "./profile-completion-task-list";
import type { Item } from "./profile-completion-task-list-item";

export function ProfileCompletionCard({ tasks }: { tasks: Item[] }) {
	const { themed } = useAppTheme();

	const { isOpen, onToggle } = useToggle();

	return (
		<Animated.View style={themed($root)} layout={makeSpringy(LinearTransition)}>
			<Pressable onPress={onToggle}>
				<View>
					<Text size="xl" weight="bold">
						Complete Your Profile
					</Text>
					<Text size="xs" color="dim">
						Unlock your full potential by completing your profile
					</Text>
				</View>
			</Pressable>
			{isOpen && (
				<Animated.View
					entering={FadeIn}
					exiting={FadeOut.duration(50)}
					style={themed($content)}
				>
					<ProfileCompletionTaskList tasks={tasks} />
					<ProfileCompletionCTA />
				</Animated.View>
			)}
		</Animated.View>
	);
}
const $root: ThemedViewStyle = (theme) => ({
	backgroundColor: theme.colors.palette.neutral200,
	padding: theme.spacing.md,
	gap: theme.spacing.sm,
	borderRadius: theme.roundness,
	position: "relative",
});

const $content: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.md,
});
