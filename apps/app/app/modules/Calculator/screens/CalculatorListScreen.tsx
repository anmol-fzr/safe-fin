import { Pressable } from "react-native";
import { ListView, Screen, ScreenHeader, Text } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import { $styles, spacing } from "@/theme";
import { CALCULATOR_CONFIG, type CalcListItem } from "@/utils/const";
import { useAppTheme } from "@/utils/useAppTheme";

const calcs: CalcListItem[] = [];

Object.keys(CALCULATOR_CONFIG).map((calcConfigKey) => {
	const config =
		CALCULATOR_CONFIG[calcConfigKey as keyof typeof CALCULATOR_CONFIG];
	calcs.push(config.list);
});

export const CalculatorListScreen = () => {
	const { navigate } = useSafeNavigation();

	const { theme } = useAppTheme();

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="calculatorListScreen:title"
				tagLineTx="calculatorListScreen:tagLine"
			/>
			<ListView
				data={calcs}
				estimatedItemSize={113}
				keyExtractor={(item) => item.screen}
				renderItem={({ item: calc }) => (
					<Pressable
						onPress={() =>
							navigate("MainTabs", {
								screen: "Calculator",
								params: {
									screen: "Calculator",
									params: { type: calc.screen },
								},
							})
						}
						style={{
							padding: spacing.md,
							backgroundColor: theme.colors.successBackground,
							borderRadius: spacing.md,
							gap: spacing.xs,
							marginBottom: spacing.sm,
						}}
					>
						<Text preset="heading" size="xl">
							{calc.title}
						</Text>
						<Text style={{ fontSize: 14 }}>{calc.desc}</Text>
					</Pressable>
				)}
			/>
		</Screen>
	);
};
