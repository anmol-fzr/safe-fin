import type { TextStyle, ViewStyle } from "react-native";
import { Screen, Text } from "@/components";
import { RegisterForm } from "@/components/forms";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export function RegisterScreen() {
	const { themed } = useAppTheme();

	return (
		<Screen
			preset="auto"
			contentContainerStyle={themed($screenContentContainer)}
			safeAreaEdges={["top", "bottom"]}
		>
			<Text
				testID="login-heading"
				tx="registerScreen:register"
				preset="heading"
				style={themed($logIn)}
			/>
			<Text
				tx="registerScreen:enterDetails"
				preset="subheading"
				style={themed($enterDetails)}
			/>

			<RegisterForm />
		</Screen>
	);
}

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingVertical: spacing.xxl,
	paddingHorizontal: spacing.lg,
	height: "100%",
});

const $logIn: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.sm,
});

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.lg,
});
