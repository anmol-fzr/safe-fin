import { Screen } from "@/components";
import { spacing } from "@/theme";
import { DeleteAccountCard, SessionsCard } from "../components";

export const AccountScreen = () => {
	return (
		<Screen
			preset="scroll"
			safeAreaEdges={["bottom"]}
			contentContainerStyle={{ gap: spacing.sm }}
		>
			<SessionsCard />
			<DeleteAccountCard />
		</Screen>
	);
};
