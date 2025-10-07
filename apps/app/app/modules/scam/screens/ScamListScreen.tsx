import { Search } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { Screen, ScreenHeader, TextField } from "@/components";
import { spacing } from "@/theme";
import { ScamList } from "../components";

export function ScamListScreen() {
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
			<View>
				<ScamList />
			</View>
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
