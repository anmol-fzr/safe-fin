import { StyleSheet, View, Text } from "react-native";

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
	},
	text: {
		fontSize: 24,
	},
});
