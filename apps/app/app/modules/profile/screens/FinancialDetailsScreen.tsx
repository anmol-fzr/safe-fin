import { GoBack, Screen } from "@/components";
import { $styles } from "@/theme";
import { FinancialDetailsForm } from "../components/FinancialDetailsForm";

export const FinancialDetailsScreen = () => {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="demoGraphicsScreen:title" />
			<FinancialDetailsForm />
		</Screen>
	);
};
