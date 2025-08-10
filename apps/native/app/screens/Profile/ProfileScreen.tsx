import { Screen, ScreenHeader } from "@/components";
import { $styles } from "@/theme";
import { ProfileForm } from "@/components/forms";

export const ProfileScreen = () => {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="profileScreen:title"
				tagLineTx="profileScreen:tagLine"
			/>

			<ProfileForm />
		</Screen>
	);
};
