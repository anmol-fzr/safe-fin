import { Stack } from "expo-router";
import { ScreenHeader } from "@/components";
import { useAppTheme } from "@/utils/useAppTheme";

export default function ProfileLayout() {
	const {
		theme: { colors },
	} = useAppTheme();
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					header: (props) => (
						<ScreenHeader
							titleTx="profileScreen:title"
							tagLineTx="profileScreen:tagLine"
							{...props}
						/>
					),
					// headerTitle: "Profile",
					// headerStyle: {
					// 	backgroundColor: colors.background,
					// },
				}}
			/>
		</Stack>
	);
}
