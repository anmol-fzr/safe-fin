import {
	NavigationContainer,
	type NavigatorScreenParams,
	useNavigation,
} from "@react-navigation/native";
import {
	createNativeStackNavigator,
	type NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui, TamaguiProvider } from "@tamagui/core";
import { PortalProvider } from "@tamagui/portal";
import { observer } from "mobx-react-lite";
import { type ComponentProps, useEffect } from "react";
import type { ResultRecord } from "@/components/quiz/QuizRender";
import { LoginScreen, RegistrationScreen } from "@/modules/Auth/screen";
import { useAuthStore } from "@/modules/Auth/store";
import { CalculatorScreen } from "@/modules/Calculator/screens/CalculatorScreen";
import * as Screens from "@/screens";
import { useAppTheme, useThemeProvider } from "@/utils/useAppTheme";
import Config from "../config";
import { type DemoTabParamList, MainTabNavigator } from "./MainTabNavigator";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";

const authStateXScreenMap = {
	login: "Login",
	register: "Registration",
	complete: "Welcome",
} as const;

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type CalculatorType = "SIP" | "SWP" | "MF" | "PPF";

export type AppStackParamList = {
	Welcome: undefined;
	Login: undefined;
	Registration: undefined;
	MainTabs: NavigatorScreenParams<DemoTabParamList>;
	Quiz: { quizId: number };
	QuizResult: {
		answers: ResultRecord;
		quizId: number;
	};

	Calculator: { type: CalculatorType };

	Scam: { scamId: number };
	Lessons: undefined;
	Lesson: { lessonId: number };
};

export type ScreenProps<S extends keyof AppStackParamList> =
	AppStackScreenProps<S>;

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
	NativeStackScreenProps<AppStackParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const RootStack = createNativeStackNavigator<AppStackParamList>();

function AppStack() {
	const isAuthenticated = useAuthStore((state) => state.isLogin);
	const currAuthState = useAuthStore((state) => state.state);

	const {
		theme: { colors },
	} = useAppTheme();

	const { navigate } = useNavigation();

	useEffect(() => {
		navigate(authStateXScreenMap[currAuthState]);
	}, [navigate, currAuthState]);

	return (
		<RootStack.Navigator
			screenOptions={{
				headerShown: false,
				navigationBarColor: colors.background,
				contentStyle: {
					backgroundColor: colors.background,
				},
			}}
			initialRouteName={isAuthenticated ? "Welcome" : "Login"}
		>
			{isAuthenticated ? (
				<>
					<RootStack.Screen name="Welcome" component={Screens.WelcomeScreen} />
					<RootStack.Screen name="MainTabs" component={MainTabNavigator} />
					<RootStack.Screen name="Quizzes" component={Screens.QuizzesScreen} />
					<RootStack.Screen name="Quiz" component={Screens.QuizScreen} />
					<RootStack.Screen
						name="QuizResult"
						component={Screens.QuizResultScreen}
					/>

					<RootStack.Screen name="Scam" component={Screens.ScamScreen} />
					<RootStack.Screen name="Lessons" component={Screens.LessonsScreen} />
					<RootStack.Screen name="Lesson" component={Screens.LessonScreen} />

					{/* Calculators */}
					<RootStack.Screen name="Calculator" component={CalculatorScreen} />
				</>
			) : (
				<>
					<RootStack.Screen name="Login" component={LoginScreen} />
					<RootStack.Screen
						name="Registration"
						component={RegistrationScreen}
					/>
				</>
			)}
		</RootStack.Navigator>
	);
}

export interface NavigationProps
	extends Partial<
		ComponentProps<typeof NavigationContainer<AppStackParamList>>
	> {}

const config = createTamagui(defaultConfig);

export const AppNavigator = observer(function AppNavigator(
	props: NavigationProps,
) {
	const {
		themeScheme,
		navigationTheme,
		setThemeContextOverride,
		ThemeProvider,
	} = useThemeProvider();

	useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

	return (
		<TamaguiProvider config={config}>
			<ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
				<NavigationContainer
					ref={navigationRef}
					theme={navigationTheme}
					{...props}
				>
					<Screens.ErrorBoundary catchErrors={Config.catchErrors}>
						<PortalProvider shouldAddRootHost>
							<AppStack />
						</PortalProvider>
					</Screens.ErrorBoundary>
				</NavigationContainer>
			</ThemeProvider>
		</TamaguiProvider>
	);
});
