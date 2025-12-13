import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components";
import { Calculator } from "@/modules/calculator/components/Calculator";
import { $styles } from "@/theme";

export default function CalculatorScreen() {
	const params = useLocalSearchParams();
	const { id } = params;

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["bottom"]}
		>
			<Calculator id={id} />
		</Screen>
	);
}
