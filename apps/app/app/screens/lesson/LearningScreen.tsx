import { Screen, ScreenHeader, Text } from "@/components";
import { $styles, spacing, ThemedStyle } from "@/theme";
import { Link } from "@react-navigation/native";
import { View, Image, StyleSheet, ViewStyle, TextStyle } from "react-native";
import chainReactLogo from "../../../assets/images/ui/books.png";
import checkList from "../../../assets/images/ui/checklist.png";
import { useAppTheme } from "@/utils/useAppTheme";

export function LearningScreen() {
	const { themed } = useAppTheme();
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="learningScreen:title"
				tagLineTx="lessonScreen:tagLine"
			/>
			<View style={styles.cards}>
				<Link screen="Quizzes">
					<View style={themed($card)}>
						<Text preset="heading" style={themed($quizCardText)}>
							Quizzes
						</Text>
						<Image source={checkList} style={styles.quizCardImage} />
					</View>
				</Link>
				<Link screen="Lessons">
					<View style={themed($card)}>
						<Text preset="heading" style={themed($lessonCardText)}>
							Lessons
						</Text>
						<Image source={chainReactLogo} style={styles.lessonCardImage} />
					</View>
				</Link>
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	cards: {
		gap: spacing.md,
	},
	quizCardImage: {
		height: "70%",
		marginTop: "auto",
		marginRight: "auto",
		marginBottom: 0,
		aspectRatio: 1,
	},
	lessonCardImage: {
		height: "70%",
		marginTop: "auto",
		marginLeft: "auto",
		marginBottom: -13,
		marginRight: 13,
		aspectRatio: 1,
	},
});

const $card: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
	width: "100%",
	aspectRatio: 1,
	borderColor: colors.border,
	borderWidth: 1,
	borderRadius: spacing.lg,
});

const $quizCardText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
	margin: "auto",
	marginTop: spacing.lg,
	marginRight: spacing.lg,
	color: colors.palette.accent500,
});

const $lessonCardText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
	margin: spacing.lg,
	color: colors.palette.accent500,
});
