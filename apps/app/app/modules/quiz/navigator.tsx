import {
	createNativeStackNavigator,
	type NativeStackNavigationProp,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { ScreenHeader } from "@/components";
import { useSafeNavigation } from "@/hooks/useSafeNavigation";
import * as Screens from "./screens";

export type QuizStackParamList = {
	Quiz: { quizId: number };
	QuizResult: undefined;
};

export type QuizStackScreenProps<T extends keyof QuizStackParamList> =
	NativeStackScreenProps<QuizStackParamList, T>;

const Stack = createNativeStackNavigator<QuizStackParamList>();

type NavigationProp = NativeStackNavigationProp<
	QuizStackParamList,
	keyof QuizStackParamList
>;

export const useQuizNavigation = useSafeNavigation<NavigationProp>;

export function QuizNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Quiz"
		>
			<Stack.Screen name="Quiz" component={Screens.QuizScreen} />
			<Stack.Screen
				name="QuizResult"
				component={Screens.QuizResultScreen}
				options={{
					headerShown: true,
					header: (props) => {
						return (
							<ScreenHeader
								titleTx="resultsScreen:title"
								tagLineTx="resultsScreen:tagLine"
								{...props}
							/>
						);
					},
				}}
			/>
		</Stack.Navigator>
	);
}
