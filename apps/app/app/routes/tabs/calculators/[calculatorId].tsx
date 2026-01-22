import { Screen } from "@/components";
import { Calculator } from "@/modules/calculator/components/Calculator";
import { $styles } from "@/theme";
import { z } from "zod";
import { idSchema } from "@/schema";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";

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
