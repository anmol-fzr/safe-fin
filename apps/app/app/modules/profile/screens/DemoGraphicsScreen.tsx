import { GoBack, Screen } from "@/components";
import { $styles } from "@/theme";
import { DemoGraphicsForm } from "../components";

export const DemoGraphicsScreen = () => {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="demoGraphicsScreen:title" />
			<DemoGraphicsForm />
		</Screen>
	);
};
