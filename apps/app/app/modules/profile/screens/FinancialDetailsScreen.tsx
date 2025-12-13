import { Screen } from "@/components";
import { GuestSafe } from "@/components/guest/GuestSafe";
import { $styles } from "@/theme";
import { FinancialDetailsForm } from "../components/FinancialDetailsForm";

export const FinancialDetailsScreen = () => {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<GuestSafe>
				<FinancialDetailsForm />
			</GuestSafe>
		</Screen>
	);
};
