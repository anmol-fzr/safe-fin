import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Screen, ScreenHeader, ListView } from "@/components";
import { $styles, spacing } from "@/theme";
import { CalcListItem, CALCULATOR_CONFIG } from "@/utils/const";

const calcs: CalcListItem[] = [];

Object.keys(CALCULATOR_CONFIG).map((calcConfigKey) => {
	const config =
		CALCULATOR_CONFIG[calcConfigKey as keyof typeof CALCULATOR_CONFIG];
	calcs.push(config.list);
});

export const CalculatorListScreen = () => {
	const navigation = useNavigation();

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
							navigation.navigate("Calculator", { type: calc.screen })
						}
						style={{
							borderWidth: 1,
							padding: spacing.md,
							borderRadius: spacing.md,
							gap: spacing.xs,
							marginBottom: spacing.md,
						}}
					>
						<Text style={{ fontSize: 24, fontWeight: "heavy" }}>
							{calc.title}
						</Text>
						<Text style={{ fontSize: 14 }}>{calc.desc}</Text>
					</Pressable>
				)}
			/>
		</Screen>
	);
};
