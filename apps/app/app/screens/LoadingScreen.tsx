import { View, Text, StyleSheet } from "react-native";

export const LoadingScreen = () => {
	return (
		<View style={styles.view}>
			<Text style={styles.text}>Loading...</Text>
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
