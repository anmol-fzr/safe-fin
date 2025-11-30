import { GoBack } from "@/components";
import { GuestSafe } from "@/components/guest/GuestSafe";
import { MinimalNoScrollScreen } from "@/components/MinimalNoScrollScreen";
import { FinancialDetailsForm } from "../components/FinancialDetailsForm";

export const FinancialDetailsScreen = () => {
	return (
		<MinimalNoScrollScreen>
			<GoBack tx="demoGraphicsScreen:title" />
			<GuestSafe>
				<FinancialDetailsForm />
			</GuestSafe>
		</MinimalNoScrollScreen>
	);
};
