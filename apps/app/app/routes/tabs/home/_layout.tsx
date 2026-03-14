import { Stack } from "expo-router";
import { HomeHeader } from "@/modules/home/components";

export default function HomeLayout() {
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
