import { Screen } from "@/components";
import { GuestSafe } from "@/components/guest/GuestSafe";
import { $styles } from "@/theme";
import { DemoGraphicsForm } from "../components";

export const DemoGraphicsScreen = () => {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<GuestSafe>
				<DemoGraphicsForm />
			</GuestSafe>
		</Screen>
	);
};
