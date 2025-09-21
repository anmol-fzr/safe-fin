import type { ViewStyle } from "react-native";
import { Image, View } from "react-native";
import { Text } from "@/components";
import { colors, spacing, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

const learnActionImage = require("assets/icons/home/learn-action.png");
const calculateActionImage = require("assets/icons/home/calculate-action.png");
const scamActionImage = require("assets/icons/home/scam-action.png");
const moreActionImage = require("assets/icons/home/more-action.png");

const actions = [
	{
		label: "Learn",
		image: learnActionImage,
		bg: colors.palette.accent300,
	},
	{
		label: "Calculator",
		image: calculateActionImage,
		bg: colors.palette.successBackground,
	},
	{
		label: "Scams",
		image: scamActionImage,
		bg: colors.palette.warningBackground,
	},
	{
		label: "More",
		image: moreActionImage,
		bg: colors.palette.neutral100,
	},
] as const;

export function QuickActions() {
	const { themed } = useAppTheme();

	return (
		<View>
			<Text preset="heading" size="lg">
				Quick Actions
			</Text>
			{/*
			<View style={{ flex: 1, flexWrap: "wrap", gap: spacing.sm }}>
      */}
			<View style={{ gap: spacing.sm }}>
				{actions.map((action) => (
					<View
						key={action.label}
						style={[themed($quickActionCard), { backgroundColor: action.bg }]}
					>
						<Text preset="subheading">{action.label}</Text>
						<Image
							source={action.image}
							style={{ position: "absolute", bottom: 0, right: spacing.md }}
						/>
					</View>
				))}
			</View>
		</View>
	);
}

const $quickActionCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
	padding: spacing.md,
	borderRadius: spacing.sm,
	width: "50%",
	aspectRatio: 1.92,
	position: "relative",
});
