import type { TextStyle, ViewStyle } from "react-native";
import {
	type BottomTabScreenProps,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../components";
import { translate } from "@/i18n";
import {
	ProfileScreen,
	DemoDebugScreen,
	CalculatorListScreen,
	ScamsScreen,
	SettingScreen,
} from "../screens";
import type { ThemedStyle } from "@/theme";
import type { AppStackParamList, AppStackScreenProps } from "./AppNavigator";
import { useAppTheme } from "@/utils/useAppTheme";
import { envs } from "@/utils/envs";
import { LearningScreen } from "@/screens/lesson";
import { SettingsService } from "better-auth/client/plugins";

export type DemoTabParamList = {
	Profile: undefined;
	Scams: undefined;
	Learning: undefined;
	DemoDebug: undefined;
	CalculatorList: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<DemoTabParamList, T>,
		AppStackScreenProps<keyof AppStackParamList>
	>;

const Tab = createBottomTabNavigator<DemoTabParamList>();

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 */
export function DemoNavigator() {
	const { bottom } = useSafeAreaInsets();
	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarStyle: themed([$tabBar, { height: bottom + 70 }]),
				tabBarActiveTintColor: colors.text,
				tabBarInactiveTintColor: colors.text,
				tabBarLabelStyle: themed($tabBarLabel),
				tabBarItemStyle: themed($tabBarItem),
			}}
		>
			<Tab.Screen
				name="CalculatorList"
				component={CalculatorListScreen}
				options={{
					tabBarAccessibilityLabel: translate(
						"demoNavigator:calculatorListTab",
					),
					tabBarLabel: translate("demoNavigator:calculatorListTab"),
					tabBarIcon: ({ focused }) => (
						<Icon
							icon="podcast"
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="SettingScreen"
				component={SettingScreen}
				options={{
					tabBarLabel: translate("demoNavigator:settingsTab"),
					tabBarIcon: ({ focused }) => (
						<Icon
							icon="community"
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Scams"
				component={ScamsScreen}
				options={{
					tabBarLabel: translate("demoNavigator:scamTab"),
					tabBarIcon: ({ focused }) => (
						<Icon
							icon="bell"
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			<Tab.Screen
				name="Learning"
				component={LearningScreen}
				options={{
					tabBarLabel: translate("demoNavigator:learningTab"),
					tabBarIcon: ({ focused }) => (
						<Icon
							icon="community"
							color={focused ? colors.tint : colors.tintInactive}
							size={30}
						/>
					),
				}}
			/>

			{envs.isDev && (
				<Tab.Screen
					name="DemoDebug"
					component={DemoDebugScreen}
					options={{
						tabBarLabel: translate("demoNavigator:debugTab"),
						tabBarIcon: ({ focused }) => (
							<Icon
								icon="debug"
								color={focused ? colors.tint : colors.tintInactive}
								size={30}
							/>
						),
					}}
				/>
			)}
		</Tab.Navigator>
	);
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
	backgroundColor: colors.background,
	borderTopColor: colors.transparent,
});

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingTop: spacing.md,
});

const $tabBarLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
	fontSize: 12,
	fontFamily: typography.primary.medium,
	lineHeight: 16,
	color: colors.text,
});
