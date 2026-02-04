import { StyleSheet, View } from "react-native";
import { ListView } from "@/components";
import { Section } from "@/components/Section";
import { useAppTheme } from "@/utils/useAppTheme";
import { QuickActionCard, type QuickActionType } from "./quick-action-card";

const learnActionImage = require("assets/icons/home/learn-action.png");
const calculateActionImage = require("assets/icons/home/calculate-action.png");
//const scamActionImage = require("assets/icons/home/scam-action.png");
const moreActionImage = require("assets/icons/home/more-action.png");

export function QuickActions() {
	const {
		theme: { colors },
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
		// {
		// 	labelTx: "screens:homeScreen.actions.scams",
		// 	image: scamActionImage,
		// 	to: "/tabs/scams",
		// 	bg: colors.palette.warningBackground,
		// },
		{
			labelTx: "screens:homeScreen.actions.more",
			image: moreActionImage,
			to: "/tabs/profile",
			bg: colors.palette.neutral200,
		},
	];

	return (
		<Section>
			<Section.Title>Quick Actions</Section.Title>
			<View style={{ flex: 1 }}>
				<ListView
					data={actions}
					keyExtractor={(action) => action.labelTx}
					numColumns={2}
					estimatedItemSize={112}
					contentContainerStyle={styles.separator}
					renderItem={({ item }) => <QuickActionCard {...item} />}
				/>
			</View>
		</Section>
	);
}

const styles = StyleSheet.create({
	separator: {
		gap: 8,
		rowGap: 12,
	},
});
