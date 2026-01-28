import { Stack } from "expo-router";
import { HomeHeader } from "@/modules/home/components/home-header";

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{
					header: (props) => (
						<HomeHeader
							titleTx="screens:learningList.title"
							tagLineTx="screens:learningList.tagLine"
							{...props}
						/>
					),
				}}
			/>
		</Stack>
	);
}
