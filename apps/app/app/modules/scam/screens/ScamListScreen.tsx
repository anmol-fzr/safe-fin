import { Screen } from "@/components";
import { $styles } from "@/theme";
import { ScamList } from "../components";

export function ScamListScreen() {
	return (
		<Screen preset="auto" contentContainerStyle={$styles.container}>
			<ScamList />
		</Screen>
	);
}
