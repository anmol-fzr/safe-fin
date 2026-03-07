import { z } from "zod";
import { Screen } from "@/components";
import { createRoute } from "@/factory/route";
import { Calculator } from "@/modules/calculator/components/Calculator";
import { idSchema } from "@/schema";
import { $styles } from "@/theme";

const { useParams } = createRoute({
	paramSchema: z.object({
		calculatorId: idSchema,
	}),
});

export default function CalculatorScreen() {
	const { calculatorId } = useParams();

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
