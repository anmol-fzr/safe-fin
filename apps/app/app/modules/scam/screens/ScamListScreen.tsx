import { Screen } from "@/components";
import { $styles } from "@/theme";
import { ScamList } from "../components";

export function ScamListScreen() {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.fullHeaderScreen}>
			<ScamList />
		</Screen>
	);
}
