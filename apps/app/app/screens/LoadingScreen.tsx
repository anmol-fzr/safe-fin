import { Image, StyleSheet, View } from "react-native";
import { colors } from "@/theme";

const icon = require("assets/icons/app-icons/android/adaptive-icon-transparent-dark.png");

export const LoadingScreen = () => {
	return (
		<View style={styles.view}>
			<Image
				source={icon}
				height={100}
				width={100}
				style={{ height: 284, width: 284 }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		flex: 1,
		backgroundColor: colors.background,
	},
});
