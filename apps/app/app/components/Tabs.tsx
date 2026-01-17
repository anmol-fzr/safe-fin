import { PressableScale } from "pressto";
import React, {
	createContext,
	type ReactNode,
	useContext,
	useState,
} from "react";
import {
	type StyleProp,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { ANIMATION, getSpringConfig, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "./Text";

interface TabsContextValue {
	activeValue: string;
	setActiveValue: (value: string) => void;
}

interface TabsProps {
	defaultValue: string;
	value?: string;
	onValueChange?: (value: string) => void;
	children: ReactNode;
	className?: string;
	style?: StyleProp<ViewStyle>;
}

interface TabsListProps {
	children: ReactNode;
	className?: string;
	style?: StyleProp<ViewStyle>;
}

interface TabsTriggerProps {
	value: string;
	children: ReactNode;
	className?: string;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	disabled?: boolean;
}

interface TabsContentProps {
	value: string;
	children: ReactNode;
	className?: string;
	style?: StyleProp<ViewStyle>;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error("Tabs compound components must be used within Tabs");
	}
	return context;
};

export function Tabs({
	defaultValue,
	value: controlledValue,
	onValueChange,
	children,
	style,
}: TabsProps) {
	const [internalValue, setInternalValue] = useState(defaultValue);
	const isControlled = controlledValue !== undefined;
	const activeValue = isControlled ? controlledValue : internalValue;

	const handleValueChange = (newValue: string) => {
		if (!isControlled) {
			setInternalValue(newValue);
		}
		onValueChange?.(newValue);
	};

	return (
		<TabsContext.Provider
			value={{ activeValue, setActiveValue: handleValueChange }}
		>
			<View style={style}>{children}</View>
		</TabsContext.Provider>
	);
}

function TabsList({ children, style }: TabsListProps) {
	const { themed } = useAppTheme();

	return <View style={[themed($tabsListStyle), style]}>{children}</View>;
}

function TabsTrigger({
	value,
	children,
	style,
	textStyle,
	disabled = false,
}: TabsTriggerProps) {
	const { activeValue, setActiveValue } = useTabsContext();
	const { themed } = useAppTheme();
	const isActive = activeValue === value;

	const handlePress = () => {
		if (!disabled) {
			setActiveValue(value);
		}
	};

	return (
		<PressableScale
			onPress={handlePress}
			style={[themed($tabsTriggerStyle), style]}
		>
			<View
				style={[
					themed($tabsTriggerInnerStyle),
					isActive && themed($tabsTriggerActiveStyle),
				]}
			>
				<Text
					style={[
						themed($tabsTriggerTextStyle),
						isActive && themed($tabsTriggerActiveTextStyle),
						textStyle,
					]}
				>
					{children}
				</Text>
			</View>
		</PressableScale>
	);
}

function TabsContent({ value, children, style }: TabsContentProps) {
	const { activeValue } = useTabsContext();
	const isActive = activeValue === value;

	const opacity = useSharedValue(isActive ? 1 : 0);
	const translateY = useSharedValue(isActive ? 0 : 25);

	React.useEffect(() => {
		if (isActive) {
			opacity.value = withTiming(1, { duration: 200 });

			const { damping, stiffness } = getSpringConfig(ANIMATION.spatial.default);

			translateY.value = withSpring(0, {
				damping,
				stiffness,
			});
		}
	}, [isActive, opacity, translateY]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateY: translateY.value }],
	}));

	if (!isActive) {
		return null;
	}

	return (
		<Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
	);
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.Content = TabsContent;

const $tabsListStyle: ThemedStyle<ViewStyle> = ({
	spacing,
	colors,
	roundness,
}) => ({
	flexDirection: "row",
	marginVertical: spacing.md,
	borderRadius: roundness,
	borderWidth: 1,
	borderColor: colors.palette.neutral300,
});

const $tabsTriggerStyle: ThemedStyle<ViewStyle> = ({ roundness }) => ({
	flex: 1,
	borderRadius: roundness,
});

const $tabsTriggerInnerStyle: ThemedStyle<ViewStyle> = ({
	spacing,
	roundness,
	colors,
}) => ({
	borderRadius: roundness,
	paddingVertical: spacing.sm,
	paddingHorizontal: spacing.md,
	backgroundColor: colors.palette.neutral100,
	alignItems: "center",
	justifyContent: "center",
});

const $tabsTriggerActiveStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
	backgroundColor: colors.palette.neutral200,
});

const $tabsTriggerTextStyle: ThemedStyle<TextStyle> = ({
	typography,
	colors,
}) => ({
	fontSize: 16,
	fontFamily: typography.primary.medium,
	color: colors.textDim,
});

const $tabsTriggerActiveTextStyle: ThemedStyle<TextStyle> = ({ colors }) => ({
	color: colors.text,
});
