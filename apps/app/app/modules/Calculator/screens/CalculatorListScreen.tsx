import { Screen, ScreenHeader } from "@/components";
import { $styles } from "@/theme";
import { CALCULATOR_CONFIG, type CalcListItem } from "@/utils/const";
import { CalculatorList } from "../components/CalculatorList";

const calcs: CalcListItem[] = [];

Object.keys(CALCULATOR_CONFIG).map((calcConfigKey) => {
	const config =
		CALCULATOR_CONFIG[calcConfigKey as keyof typeof CALCULATOR_CONFIG];
	calcs.push(config.list);
});

export const CalculatorListScreen = () => {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top", "bottom"]}
		>
			<ScreenHeader
				titleTx="calculatorListScreen:title"
				tagLineTx="calculatorListScreen:tagLine"
			/>
			<CalculatorList />
		</Screen>
	);
};
