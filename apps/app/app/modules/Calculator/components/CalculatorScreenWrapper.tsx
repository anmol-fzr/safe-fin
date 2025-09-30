import type { PropsWithChildren } from "react";
import { GoBack, Screen } from "@/components";
import { $styles } from "@/theme";

export function CalculatorScreenWrapper({ children }: PropsWithChildren) {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top", "bottom"]}
		>
			<GoBack tx="calculatorListScreen:title" />
			{children}
		</Screen>
	);
}
