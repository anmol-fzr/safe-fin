import { HomeScreen } from "@home/screens";
import {
	type BottomTabScreenProps,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
	type CompositeScreenProps,
	useNavigationState,
} from "@react-navigation/native";
import {
	Book,
	Calculator,
	Home2,
	Security,
	User,
} from "iconsax-react-nativejs";
import type { TextStyle, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TabIcon } from "@/components/navigation/TabIcon";
import { TabLabel } from "@/components/navigation/TabLabel";
import { t } from "@/i18n";
import {
	CalculatorNavigator,
	calculatorTabHiddenScreens,
} from "@/modules/calculator/navigator";
import { LessonNavigator } from "@/modules/lesson/navigator";
import { ProfileNavigator } from "@/modules/profile/navigator";
import { ScamNavigator } from "@/modules/scam/navigator";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { AppStackParamList, AppStackScreenProps } from "./AppNavigator";

export type MainTabParamList = {
	Home: undefined;
	Profile: undefined;
	Scams: undefined;
	Learning: undefined;
	CalculatorTab: undefined;
};

const translate = t("mainNavigator").bind(null);
const showTabBarLabel = true;
const tabBarLabel = showTabBarLabel ? translate.bind(null) : () => "";

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

	const navigationState = useNavigationState((state) => state);

	const getNestedRouteName = (state: any): string | null => {
		if (!state) return null;
		const route = state.routes[state.index];
		if (route.state) {
			return getNestedRouteName(route.state);
		}
		return route.name;
	};

	const currentRouteName = getNestedRouteName(navigationState);

	const hideTabBarScreens = [...calculatorTabHiddenScreens];

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarActiveTintColor: colors.text,
				tabBarInactiveTintColor: colors.text,
				tabBarLabelStyle: themed($tabBarLabel),
				tabBarItemStyle: themed($tabBarItem),
				tabBarStyle: [
					themed([$tabBar, { height: bottom + 80 }]),
					{
						display: hideTabBarScreens.includes(currentRouteName)
							? "none"
							: "flex",
					},
				],
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarAccessibilityLabel: translate("homeTab"),
					tabBarLabel: (props) => (
						<TabLabel {...props}>{tabBarLabel("homeTab")}</TabLabel>
					),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={Home2} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="CalculatorTab"
				component={CalculatorNavigator}
				options={{
					tabBarAccessibilityLabel: translate("calculatorListTab"),
					tabBarLabel: (props) => (
						<TabLabel {...props}>{tabBarLabel("calculatorListTab")}</TabLabel>
					),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={Calculator} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Learning"
				component={LessonNavigator}
				options={{
					tabBarAccessibilityLabel: translate("learnTab"),
					tabBarLabel: (props) => (
						<TabLabel {...props}>{tabBarLabel("learnTab")}</TabLabel>
					),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={Book} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Scams"
				component={ScamNavigator}
				options={{
					tabBarAccessibilityLabel: translate("scamTab"),
					tabBarLabel: (props) => (
						<TabLabel {...props}>{tabBarLabel("scamTab")}</TabLabel>
					),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={Security} focused={focused} />
					),
				}}
			/>

			<Tab.Screen
				name="Profile"
				component={ProfileNavigator}
				options={{
					tabBarAccessibilityLabel: translate("profileTab"),
					tabBarLabel: (props) => (
						<TabLabel {...props}>{tabBarLabel("profileTab")}</TabLabel>
					),
					tabBarIcon: ({ focused }) => (
						<TabIcon Icon={User} focused={focused} />
					),
				}}
			/>
		</Tab.Navigator>
	);
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors }) => ({
	backgroundColor: colors.background,
	borderTopColor: colors.transparent,
});

const $tabBarItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	paddingTop: spacing.sm,
	paddingBottom: spacing.sm,
});

const $tabBarLabel: ThemedStyle<TextStyle> = ({
	colors,
	typography,
	spacing,
}) => ({
	fontSize: 12,
	fontFamily: typography.primary.medium,
	lineHeight: 16,
	marginTop: spacing.xxs,
	color: colors.tintInactive,
});
