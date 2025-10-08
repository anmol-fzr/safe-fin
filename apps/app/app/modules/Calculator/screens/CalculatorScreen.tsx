import { CalculatorScreenWrapper } from "@/modules/Calculator/components";
import { Calculator } from "../components/Calculator";

import type { CalculatorStackScreenProps } from "../navigator";

type CalculatorScreenProps = CalculatorStackScreenProps<"Calculator">;

export function CalculatorScreen(props: CalculatorScreenProps) {
	const { id } = props.route.params;

	return (
		<CalculatorScreenWrapper>
			<Calculator id={id} />
		</CalculatorScreenWrapper>
	);
}
