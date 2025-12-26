import { useLocalSearchParams } from "expo-router";
import { Screen } from "@/components";
import { Calculator } from "@/modules/calculator/components/Calculator";
import { $styles } from "@/theme";
import { MissingRouteParamError } from "@/utils/error";

export default function CalculatorScreen() {
	const params = useLocalSearchParams();

	if (!params.id) {
		throw new MissingRouteParamError("id", "CalculatorScreen");
	}

	const calcId = Number(params.id);

	if (!Number.isSafeInteger(calcId)) {
		throw new TypeError("Scam Id must be a Number");
	}

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["bottom"]}
		>
			<Calculator id={calcId} />
		</Screen>
	);
}
