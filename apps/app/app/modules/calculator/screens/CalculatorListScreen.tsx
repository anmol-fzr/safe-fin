import { Screen } from "@/components";
import { $styles } from "@/theme";
import { CalculatorList } from "../components";

export const CalculatorListScreen = () => {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.fullHeaderScreen}>
			<CalculatorList />
		</Screen>
	);
};
