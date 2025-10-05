import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";

export const LoadingScreen = () => {
	return (
		<View style={styles.view}>
			<Text
				style={{
					fontSize: 36,
					lineHeight: 44,
					fontFamily: "spaceGroteskBold",
				}}
			>
				SafeFin
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		backgroundColor: colors.background,
	},
	text: {
		fontSize: 24,
	},
});
