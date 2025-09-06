import { Screen, ScreenHeader, TextField } from "@/components";
import { View } from "react-native";
import { $styles, spacing } from "@/theme";
import { ScamList } from "@/components/scam/ScamList";
import { ScrollView, YStack, ListItem } from "tamagui";
import { Search } from "lucide-react-native";
import { useState } from "react";

export function ScamsScreen() {
	const [state, setState] = useState("");

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
			<ScrollView>
				<ScamList />
			</ScrollView>
			<View
				style={{
					paddingTop: spacing.lg,
				}}
			>
				<TextField
					value={state}
					onChangeText={setState}
					LeftAccessory={() => (
						<View
							style={{
								alignContent: "center",
								justifyContent: "center",
								padding: 8,
							}}
						>
							<Search />
						</View>
					)}
				/>
			</View>
		</Screen>
	);
}
