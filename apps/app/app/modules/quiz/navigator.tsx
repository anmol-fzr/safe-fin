import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import * as Screens from "./screens";

export type QuizStackParamList = {
	Quiz: { quizId: number };
	QuizResult: undefined;
};

export type QuizStackScreenProps<T extends keyof QuizStackParamList> =
	NativeStackScreenProps<QuizStackParamList, T>;

const Stack = createNativeStackNavigator<QuizStackParamList>();

export function QuizNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Quiz"
		>
			<Stack.Screen name="Quiz" component={Screens.QuizScreen} />
			<Stack.Screen name="QuizResult" component={Screens.QuizResultScreen} />
		</Stack.Navigator>
	);
}
