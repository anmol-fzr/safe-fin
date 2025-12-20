import { View, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { Screen, Text } from "@/components";
import { RegisterForm } from "@/modules/auth/components";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export default function RegisterScreen() {
	const {
		themed,
		theme: { spacing },
	} = useAppTheme();

	return (
		<Screen
			preset="fixed"
			safeAreaEdges={["top"]}
			contentContainerStyle={$styles.flex1}
		>
			<Animated.View style={themed($topContainer)}>
				<Text
					tx="registerScreen:register"
					preset="bold"
					size="xxl"
					style={{
						textAlign: "center",
					}}
				/>
				<Text
					tx="registerScreen:enterDetails"
					preset="subheading"
					style={{
						textAlign: "center",
					}}
				/>
			</Animated.View>

			<View
				style={{
					flex: 1,
					marginBottom: spacing.lg,
					marginInline: spacing.lg,
				}}
			>
				<RegisterForm.Root>
					<View
						style={{
							flex: 1,
						}}
					>
						<RegisterForm.Name />
						<RegisterForm.Gender />
					</View>

					<View
						style={{
							gap: spacing.md,
						}}
					>
						<RegisterForm.Submit />
					</View>
				</RegisterForm.Root>
			</View>
		</Screen>
	);
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingHorizontal: spacing.lg,
	paddingTop: spacing.xl,
});
