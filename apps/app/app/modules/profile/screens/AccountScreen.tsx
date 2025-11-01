import { ScrollView, View } from "react-native";
import { GoBack, Screen } from "@/components";
import { $styles } from "@/theme";
import { DeleteAccountCard, SessionsCard } from "../components";

export const AccountScreen = () => {
	return (
		<Screen
			preset="scroll"
			contentContainerStyle={{
				...$styles.container,
				paddingHorizontal: 0,
			}}
			safeAreaEdges={["top"]}
		>
			<View style={{ paddingHorizontal: $styles.container.paddingHorizontal }}>
				<GoBack tx="Account" />
			</View>
			<ScrollView
				contentContainerStyle={{
					gap: 36,
				}}
			>
				<SessionsCard />
				<DeleteAccountCard />
			</ScrollView>
		</Screen>
	);
};
