import { Screen, ScreenHeader } from "@/components";
import { $styles } from "@/theme";
import { ScamList } from "../components";

export function ScamListScreen() {
	return (
		<Screen
			preset="fixed"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader titleTx="scamScreen:title" tagLineTx="scamScreen:tagLine" />
			<ScamList />
		</Screen>
	);
}
