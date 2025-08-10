import { Screen, ScreenHeader } from "@/components";
import { $styles } from "@/theme";
import { ScamList } from "@/components/scam/ScamList";

export function ScamsScreen() {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader titleTx="scamScreen:title" tagLineTx="scamScreen:tagLine" />
			<ScamList />
		</Screen>
	);
}
