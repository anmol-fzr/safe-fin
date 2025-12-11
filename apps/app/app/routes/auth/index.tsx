import savingMoneyImg from "assets/images/auth/login/saving-money.png";
import { Image, StyleSheet } from "react-native";
import { MinimalNoScrollScreen } from "@/components/MinimalNoScrollScreen";
import { LoginForm } from "@/modules/auth/components";
import { spacing } from "@/theme";

export default function LoginScreen() {
	return (
		<MinimalNoScrollScreen>
			<Image source={savingMoneyImg} style={styles.image} />

			<LoginForm />
		</MinimalNoScrollScreen>
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
