import { Stack } from "expo-router";
import { HomeHeader } from "@/modules/home/components/home-header";
import { useAppTheme } from "@/utils/useAppTheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeLayout() {
	const {
		themed,
		theme: { colors, spacing },
	} = useAppTheme();
	const { top } = useSafeAreaInsets();

	return (
		<Stack>
			<Stack.Screen
				options={{
					headerShown: true,
					header: (props) => <HomeHeader {...props} />,
					// headerTitle: "Welcome",
					// headerTitleStyle: {
					// 	fontSize: 36,
					// },
					//headerStyle: {
					//marginTop: top,
					//k
					//paddingInline: spacing.sm,
					//paddingBottom: spacing.sm,
					//backgroundColor: colors.background,
					//},
				}}
				name="index"
				// options={{
				// 	header: (props) => (
				// 		<HomeHeader
				// 			titleTx="screens:learningList.title"
				// 			tagLineTx="screens:learningList.tagLine"
				// 			{...props}
				// 		/>
				// 	),
				// }}
			/>
		</Stack>
	);
}
