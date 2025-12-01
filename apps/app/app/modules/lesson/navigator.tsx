import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
	createNativeStackNavigator,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ScreenHeader } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import * as Screens from "./screens";

export type LessonStackParamList = {
	Lessons: undefined;
	Lesson: { lessonId: number };
};

export type LessonStackScreenProps<T extends keyof LessonStackParamList> =
	NativeStackScreenProps<LessonStackParamList, T>;

const Stack = createNativeStackNavigator<LessonStackParamList>();

type NavigationProp = NativeStackNavigationProp<
	LessonStackParamList,
	keyof LessonStackParamList
>;

export const useLessonNavigation = useSafeNavigation<NavigationProp>;

export function LessonNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Lessons"
		>
			<Stack.Screen
				name="Lessons"
				component={Screens.LessonListScreen}
				options={{
					headerShown: true,
					header: (props) => {
						return (
							<ScreenHeader
								titleTx="lessonScreen:title"
								tagLineTx="lessonScreen:tagLine"
								{...props}
							/>
						);
					},
				}}
			/>
			<Stack.Screen name="Lesson" component={Screens.LessonScreen} />
		</Stack.Navigator>
	);
}
