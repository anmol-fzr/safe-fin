import { useNavigation } from "@react-navigation/native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components";
import { colors, spacing } from "@/theme";
import { HomeSection } from "./HomeSection";

const learnActionImage = require("assets/icons/home/learn-action.png");
const calculateActionImage = require("assets/icons/home/calculate-action.png");
const scamActionImage = require("assets/icons/home/scam-action.png");
const moreActionImage = require("assets/icons/home/more-action.png");

const actions = [
	{
		label: "Learn",
		image: learnActionImage,
		to: "Learning",
		bg: colors.palette.accent300,
	},
	{
		label: "Calculator",
		image: calculateActionImage,
		to: "CalculatorList",
		bg: colors.palette.successBackground,
	},
	{
		label: "Scams",
		image: scamActionImage,
		to: "Scams",
		bg: colors.palette.warningBackground,
	},
	{
		label: "More",
		image: moreActionImage,
		to: "Scams",
		bg: colors.palette.neutral100,
	},
] as const;

export function QuickActions() {
	return (
		<HomeSection title="Quick Actions">
			<View style={styles.quickActionCard}>
				{actions.map((action) => (
					<QuickActionCard key={action.label} {...action} />
				))}
			</View>
		</HomeSection>
	);
}

const styles = StyleSheet.create({
	quickActionCard: { gap: spacing.sm, flexDirection: "row", flexWrap: "wrap" },
	quickAction: {
		width: "48%",
		aspectRatio: 0.9,
		alignItems: "center",
		position: "relative",
		justifyContent: "center",
		borderRadius: 12,
	},
});

type QuickActionCardProps = {
	label: string;
	image: unknown;
	to: string;
	bg: string;
};

const QuickActionCard = (action: QuickActionCardProps) => {
	const { navigate } = useNavigation();
	const handlePress = () => navigate("MainTabs", { screen: action.to });

	return (
		<Pressable
			key={action.label}
			onPress={handlePress}
			style={[styles.quickAction, { backgroundColor: action.bg }]}
		>
			<Text
				preset="subheading"
				style={{
					position: "absolute",
					top: spacing.xs,
					left: spacing.md,
				}}
			>
				{action.label}
			</Text>
			<Image
				source={action.image}
				style={{ position: "absolute", bottom: 0, right: spacing.md }}
			/>
		</Pressable>
	);
};
