import {
	createNativeStackNavigator,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Suspense } from "react";
import { LoadingScreen } from "@/screens";
import * as Screens from "./screens";

export type LessonStackParamList = {
	Lessons: undefined;
	Lesson: { lessonId: number };
};

export type LessonStackScreenProps<T extends keyof LessonStackParamList> =
	NativeStackScreenProps<LessonStackParamList, T>;

const Stack = createNativeStackNavigator<LessonStackParamList>();

export function LessonNavigator() {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName="Lessons"
			>
				<Stack.Screen name="Lessons" component={Screens.LessonsScreen} />
				<Stack.Screen name="Lesson" component={Screens.LessonScreen} />
			</Stack.Navigator>
		</Suspense>
	);
}
