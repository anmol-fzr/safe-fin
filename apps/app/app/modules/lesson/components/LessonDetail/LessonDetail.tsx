import { Bookmark2, Calendar2, Share } from "iconsax-react-nativejs";
import { PressableOpacity, PressableScale } from "pressto";
import type { ReactNode } from "react";
import {
	type StyleProp,
	type TextStyle,
	View,
	type ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { Icon } from "@/components/Icon";
import { Text, type TextProps } from "@/components/Text";
import { IconSax } from "@/context/IconContext";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { LessonCard } from "../LessonCard/LessonCard";
import { SharedButton } from "../shared";

// Re-export components from LessonCard that are shared
export const LessonDetail = {
	Image: LessonCard.Image,
	Title: LessonCard.Title,
	Description: LessonCard.Description,
	Metadata: LessonCard.Metadata,
	MetadataItem: LessonCard.MetadataItem,
	Rating: LessonCard.Rating,
	Updated: LessonDetailUpdated,
	Button: SharedButton,
	Actions: LessonDetailActions,
	ActionButton: LessonDetailActionButton,
	Tabs: LessonDetailTabs,
};

// New components specific to LessonDetail

interface LessonDetailUpdatedProps extends Omit<TextProps, "style"> {
	/**
	 * The updated date text
	 */
	children: ReactNode;
	/**
	 * Style override
	 */
	style?: StyleProp<TextStyle>;
}

function LessonDetailUpdated(props: LessonDetailUpdatedProps) {
	const { children, style: $styleOverride, ...textProps } = props;
	const { themed } = useAppTheme();

	return (
		<View style={$metadataItem}>
			<IconSax icon={Calendar2} size={18} />
			<Text
				{...textProps}
				style={[themed($metadataText), $styleOverride]}
				size="sm"
				weight="normal"
			>
				{children}
			</Text>
		</View>
	);
}

interface LessonDetailActionsProps {
	/**
	 * Children components (action buttons)
	 */
	children: ReactNode;
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonDetailActions(props: LessonDetailActionsProps) {
	const { children, style: $styleOverride } = props;

	return <View style={[$actionsRow, $styleOverride]}>{children}</View>;
}

interface LessonDetailActionButtonProps {
	/**
	 * Icon to display
	 */
	icon: "bookmark" | "share";
	/**
	 * Callback when button is pressed
	 */
	onPress?: () => void;
	/**
	 * Whether the action is active (e.g., bookmarked)
	 */
	isActive?: boolean;
}

function LessonDetailActionButton(props: LessonDetailActionButtonProps) {
	const { icon, onPress, isActive = false } = props;
	const { themed, isDark } = useAppTheme();

	const IconComponent = icon === "bookmark" ? Bookmark2 : Share;
	const iconColor = isActive ? "#6366F1" : isDark ? "#A3A3A3" : "#737373";

	return (
		<PressableScale style={themed($actionButton)} onPress={onPress}>
			<IconComponent
				size={24}
				variant={isActive ? "Bold" : "Linear"}
				color={iconColor}
			/>
		</PressableScale>
	);
}

interface LessonDetailTabsProps {
	/**
	 * Active tab
	 */
	activeTab: string;
	/**
	 * Tabs to display
	 */
	tabs: string[];
	/**
	 * Callback when tab is changed
	 */
	onTabChange: (tab: string) => void;
	/**
	 * Style override
	 */
	style?: StyleProp<ViewStyle>;
}

function LessonDetailTabs(props: LessonDetailTabsProps) {
	const { activeTab, tabs, onTabChange, style: $styleOverride } = props;
	const { themed } = useAppTheme();

	return (
		<View style={[themed($tabsContainer), $styleOverride]}>
			{tabs.map((tab) => (
				<PressableScale
					key={tab}
					style={[themed($tab), activeTab === tab && themed($activeTab)]}
					onPress={() => onTabChange(tab)}
				>
					<Text
						style={[
							themed($tabText),
							activeTab === tab && themed($activeTabText),
						]}
						size="md"
						weight="medium"
					>
						{tab}
					</Text>
				</PressableScale>
			))}
		</View>
	);
}

// Styles (reuse from LessonCard where possible)
const $metadataItem: ViewStyle = {
	flexDirection: "row",
	alignItems: "center",
	gap: 4,
};

const $metadataText: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
});

const $actionsRow: ViewStyle = {
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
	gap: 24,
	marginVertical: 16,
};

const $actionButton: ThemedStyle<ViewStyle> = (theme) => ({
	width: 48,
	height: 48,
	borderRadius: theme.roundness,
	backgroundColor: theme.colors.palette.neutral200,
	justifyContent: "center",
	alignItems: "center",
});

const $tabsContainer: ThemedStyle<ViewStyle> = (theme) => ({
	flexDirection: "row",
	//gap: theme.spacing.sm,
	marginVertical: theme.spacing.md,
	borderRadius: theme.roundness,
	borderWidth: 1,
	borderColor: theme.colors.palette.neutral300,
});

const $tab: ThemedStyle<ViewStyle> = (theme) => ({
	flex: 1,
	paddingVertical: theme.spacing.sm,
	paddingHorizontal: theme.spacing.md,
	borderRadius: theme.roundness,
	backgroundColor: theme.colors.palette.neutral100,
	alignItems: "center",
	justifyContent: "center",
	// borderWidth: 1,
	// borderColor: "transparent",
});

const $activeTab: ThemedStyle<ViewStyle> = (theme) => ({
	backgroundColor: theme.colors.palette.neutral200,
	//borderWidth: 1,
	//borderColor: theme.colors.palette.neutral300,
});

const $tabText: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.textDim,
});

const $activeTabText: ThemedStyle<TextStyle> = (theme) => ({
	color: theme.colors.text,
});

export type {
	LessonDetailUpdatedProps,
	LessonDetailActionsProps,
	LessonDetailActionButtonProps,
	LessonDetailTabsProps,
};
