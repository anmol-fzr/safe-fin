import { Screen, ScreenHeader } from "@/components";
import { $styles } from "@/theme";
import { CalculatorList } from "../components";

export const CalculatorListScreen = () => {
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
			<CalculatorList />
		</Screen>
	);
};
