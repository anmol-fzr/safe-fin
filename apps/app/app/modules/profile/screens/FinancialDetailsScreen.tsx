import { GoBack } from "@/components";
import { MinimalNoScrollScreen } from "@/components/MinimalNoScrollScreen";
import { FinancialDetailsForm } from "../components/FinancialDetailsForm";

export const FinancialDetailsScreen = () => {
	return (
		<MinimalNoScrollScreen>
			<GoBack tx="demoGraphicsScreen:title" />
			<FinancialDetailsForm />
		</MinimalNoScrollScreen>
	);
};
