import savingMoneyImg from "assets/images/auth/login/saving-money.png";
import { Image, StyleSheet } from "react-native";
import { Screen, ScreenHeader } from "@/components";
import { LoginForm } from "@/modules/auth/components";
import { spacing } from "@/theme";

export function LoginScreen() {
	return (
		<Screen
			preset="auto"
			contentContainerStyle={styles.root}
			safeAreaEdges={["top", "bottom"]}
		>
			<ScreenHeader titleTx="loginScreen:logIn" tagLineTx="loginScreen:logIn" />

			<Image source={savingMoneyImg} style={styles.image} />

			<LoginForm />
		</Screen>
	);
}

const styles = StyleSheet.create({
	root: {
		paddingVertical: spacing.xxl,
		paddingHorizontal: spacing.lg,
	},
	image: {
		width: "100%",
		objectFit: "contain",
		marginInline: "auto",
		aspectRatio: 1,
	},
});
