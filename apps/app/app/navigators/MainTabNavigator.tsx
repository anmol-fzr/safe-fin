import {
	type BottomTabScreenProps,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import type { CompositeScreenProps } from "@react-navigation/native";

import {
	BookOpenIcon,
	CalculatorIcon,
	HomeIcon,
	ShieldIcon,
	UserIcon,
} from "lucide-react-native";
import type { TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { translate } from "@/i18n";
import { CalculatorListScreen } from "@/modules/Calculator/screens/CalculatorListScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { LearningScreen } from "@/screens/lesson";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { ProfileScreen, ScamsScreen } from "../screens";
import type { AppStackParamList, AppStackScreenProps } from "./AppNavigator";
import { TabIcon } from "@/components/navigation/TabIcon";

export type MainTabParamList = {
	Home: undefined;
	Profile: undefined;
	Scams: undefined;
	Learning: undefined;
	CalculatorList: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
	CompositeScreenProps<
		BottomTabScreenProps<MainTabParamList, T>,
		AppStackScreenProps<keyof AppStackParamList>
	>;

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
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
				name="Home"
				component={HomeScreen}
				options={{
					tabBarAccessibilityLabel: translate("mainNavigator:homeTab"),
					tabBarLabel: translate("mainNavigator:homeTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={HomeIcon} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="CalculatorList"
				component={CalculatorListScreen}
				options={{
					tabBarAccessibilityLabel: translate(
						"mainNavigator:calculatorListTab",
					),
					tabBarLabel: translate("mainNavigator:calculatorListTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={CalculatorIcon} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Learning"
				component={LearningScreen}
				options={{
					tabBarLabel: translate("mainNavigator:learnTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={BookOpenIcon} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Scams"
				component={ScamsScreen}
				options={{
					tabBarLabel: translate("mainNavigator:scamTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={ShieldIcon} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					tabBarLabel: translate("mainNavigator:profileTab"),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={UserIcon} focused={focused} />
					),
				}}
			/>

			{/* TODO: Move this Debug Screen to Settings or Profile Screen */}
			{/*
			{envs.isDev && (
				<Tab.Screen
					name="DemoDebug"
					component={DemoDebugScreen}
					options={{
						tabBarLabel: translate("mainNavigator:debugTab"),
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
      */}
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
