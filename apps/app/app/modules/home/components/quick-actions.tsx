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
			labelTx: "screens:homeScreen.actions.learn",
			image: learnActionImage,
			to: "/tabs/learnings",
			bg: colors.palette.accent300,
		},
		{
			labelTx: "screens:homeScreen.actions.calculator",
			image: calculateActionImage,
			to: "/tabs/calculators",
			bg: colors.palette.successBackground,
		},
		{
			labelTx: "screens:homeScreen.actions.scams",
			image: scamActionImage,
			to: "/tabs/scams",
			bg: colors.palette.warningBackground,
		},
		{
			labelTx: "screens:homeScreen.actions.more",
			image: moreActionImage,
			to: "/tabs/profile",
			bg: colors.palette.neutral100,
		},
	];

	return (
		<Section>
			<Section.Title>Quick Actions</Section.Title>
			<View style={themed($quickActionCard)}>
				{actions.map((action) => (
					<QuickActionCard key={action.labelTx} {...action} />
				))}
			</View>
		</Section>
	);
}

const $quickActionCard: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	gap: spacing.sm,
	flexDirection: "row",
	//height: "auto",
	flexWrap: "wrap",
});
