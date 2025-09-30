import savingMoneyImg from "assets/images/auth/login/saving-money.png";
import type { TextStyle, ViewStyle } from "react-native";
import { Image, StyleSheet } from "react-native";
import { Screen, Text } from "@/components";
import { LoginForm } from "@/modules/Auth/components";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export const LoginScreen = () => {
	const { themed } = useAppTheme();

	return (
		<Screen
			preset="auto"
			contentContainerStyle={themed($screenContentContainer)}
			safeAreaEdges={["top", "bottom"]}
		>
			<Text
				testID="login-heading"
				tx="loginScreen:logIn"
				preset="heading"
				style={themed($logIn)}
			/>

			<Image source={savingMoneyImg} style={styles.image} />

			<LoginForm />
		</Screen>
	);
};
const styles = StyleSheet.create({
	image: {
		width: "100%",
		objectFit: "contain",
		marginInline: "auto",
		aspectRatio: 1,
	},
});

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingVertical: spacing.xxl,
	paddingHorizontal: spacing.lg,
});

const $logIn: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.sm,
});
