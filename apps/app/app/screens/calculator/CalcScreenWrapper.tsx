import { ReactNode } from "react";
import { Screen, GoBack } from "@/components";
import { $styles } from "@/theme";

type CalcScreenWrapperProps = {
	children: ReactNode;
};

export function CalcScreenWrapper({ children }: CalcScreenWrapperProps) {
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
