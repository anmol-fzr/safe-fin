import { z } from "zod";
import { Screen } from "@/components";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { Calculator } from "@/modules/calculator/components/Calculator";
import { idSchema } from "@/schema";
import { $styles } from "@/theme";

const paramsSchema = z.object({
	calculatorId: idSchema,
});

export default function CalculatorScreen() {
	const params = useTypedLocalSearchParams(paramsSchema);
	const { calculatorId } = params;

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["bottom"]}
		>
			<Calculator id={calculatorId} />
		</Screen>
	);
}
