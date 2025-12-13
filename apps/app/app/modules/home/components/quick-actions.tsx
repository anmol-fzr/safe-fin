import { View, type ViewStyle } from "react-native";
import { Section } from "@/components/Section";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { QuickActionCard, type QuickActionType } from "./quick-action-card";

const learnActionImage = require("assets/icons/home/learn-action.png");
const calculateActionImage = require("assets/icons/home/calculate-action.png");
const scamActionImage = require("assets/icons/home/scam-action.png");
const moreActionImage = require("assets/icons/home/more-action.png");

export function QuickActions() {
	const {
		theme: { colors },
		themed,
	} = useAppTheme();

	const actions: QuickActionType[] = [
		{
			label: "Learn",
			image: learnActionImage,
			to: "/tabs/learnings",
			bg: colors.palette.accent300,
		},
		{
			label: "Calculator",
			image: calculateActionImage,
			to: "/tabs/calculators",
			bg: colors.palette.successBackground,
		},
		{
			label: "Scams",
			image: scamActionImage,
			to: "/tabs/scams",
			bg: colors.palette.warningBackground,
		},
		{
			label: "More",
			image: moreActionImage,
			to: "/tabs/profile",
			bg: colors.palette.neutral100,
		},
	];

	return (
		<Section title="Quick Actions">
			<View style={themed($quickActionCard)}>
				{actions.map((action) => (
					<QuickActionCard key={action.label} {...action} />
				))}
			</View>
		</Section>
	);
}

const $quickActionCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	gap: spacing.sm,
	flexDirection: "row",
	flexWrap: "wrap",
});
