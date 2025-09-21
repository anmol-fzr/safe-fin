import { Screen, ScreenHeader } from "@/components";
import { spacing } from "@/theme";

export function HomeScreen() {
	return (
		<Screen
			preset="fixed"
			contentContainerStyle={{
				paddingHorizontal: spacing.lg,
				paddingTop: spacing.md,
			}}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader titleTx="scamScreen:title" tagLineTx="scamScreen:tagLine" />
		</Screen>
	);
}
