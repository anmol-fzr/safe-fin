import { PressableScale } from "pressto";
import {
    createContext,
    type ReactNode,
    useCallback,
    useMemo,
} from "react";
import {
    Image,
    type ImageSourcePropType,
    type ImageStyle,
    type StyleProp,
    type TextStyle,
    View,
    type ViewProps,
    type ViewStyle,
} from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text, type TextProps } from "@/components/Text";
import { type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

interface LessonListItemContextValue {
    themed: <T>(styleOrStyleFn: ThemedStyle<T> | StyleProp<T>) => T;
    isDark: boolean;
}

const LessonListItemContext = createContext<LessonListItemContextValue | null>(
    null,
);

interface LessonListItemRootProps {
    /**
     * Children components
     */
    children: ReactNode;
    /**
     * Callback when item is pressed
     */
    onPress?: () => void;
    /**
     * Style override for the container
     */
    style?: StyleProp<ViewStyle>;
    /**
     * Whether the item is disabled
     */
    disabled?: boolean;
}

export function LessonListItem(props: LessonListItemRootProps) {
    const { children, onPress, style: $styleOverride, disabled = false } = props;
    const { themed } = useAppTheme();

    const style = useMemo(
        () => [themed($container), disabled && themed($disabledContainer), $styleOverride],
        [themed, $styleOverride, disabled],
    );

    return (
        <PressableScale style={style} onPress={disabled ? undefined : onPress}>
            {children}
        </PressableScale>
    );
}

interface LessonListItemIconProps {
    /**
     * The lesson icon/image source
     */
    source?: ImageSourcePropType;
    /**
     * Custom icon component
     */
    children?: ReactNode;
    /**
     * Style override for the icon container
     */
    style?: StyleProp<ViewStyle>;
}

function LessonListItemIcon(props: LessonListItemIconProps) {
    const { source, children, style: $styleOverride } = props;
    const { themed } = useAppTheme();

    return (
        <View style={[themed($iconContainer), $styleOverride]}>
            {source && <Image source={source} style={$iconStyle} resizeMode="contain" />}
            {children}
        </View>
    );
}

LessonListItemIcon.Loading = () => {
    const { themed } = useAppTheme();

    const s = themed($iconContainer);

    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
                width={s.width}
                height={s.height}
                borderRadius={s.borderRadius}
            />
        </SkeletonPlaceholder>
    );
};

interface LessonListItemContentProps extends Omit<ViewProps, "style"> {
    /**
     * Children components
     */
    children: ReactNode;
    /**
     * Style override
     */
    style?: StyleProp<ViewStyle>;
}

function LessonListItemContent(props: LessonListItemContentProps) {
    const { children, style: $styleOverride, ...rest } = props;

    return (
        <View style={[$content, $styleOverride]} {...rest}>
            {children}
        </View>
    );
}

interface LessonListItemTitleProps extends Omit<TextProps, "style"> {
    /**
     * The title text
     */
    children: string;
    /**
     * Style override
     */
    style?: StyleProp<TextStyle>;
}

function LessonListItemTitle(props: LessonListItemTitleProps) {
    const { children, style: $styleOverride, ...textProps } = props;
    const { themed } = useAppTheme();

    return (
        <Text
            {...textProps}
            style={[themed($title), $styleOverride]}
            size="md"
            weight="medium"
        >
            {children}
        </Text>
    );
}

LessonListItemTitle.Loading = () => {
    return (
        <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
                width="70%"
                height={18}
                borderRadius={5}
            />
        </SkeletonPlaceholder>
    );
};

interface LessonListItemRewardProps extends Omit<TextProps, "style"> {
    /**
     * The reward amount
     */
    children: string | number;
    /**
     * Style override
     */
    style?: StyleProp<TextStyle>;
}

function LessonListItemReward(props: LessonListItemRewardProps) {
    const { children, style: $styleOverride, ...textProps } = props;
    const { themed } = useAppTheme();

    return (
        <Text
            {...textProps}
            style={[themed($reward), $styleOverride]}
            size="sm"
            weight="medium"
        >
            {children}
        </Text>
    );
}

interface LessonListItemLabelProps extends Omit<TextProps, "style"> {
    /**
     * The label text
     */
    children: string;
    /**
     * Style override
     */
    style?: StyleProp<TextStyle>;
}

function LessonListItemLabel(props: LessonListItemLabelProps) {
    const { children, style: $styleOverride, ...textProps } = props;
    const { themed } = useAppTheme();

    return (
        <Text
            {...textProps}
            style={[themed($label), $styleOverride]}
            size="xs"
            weight="medium"
        >
            {children}
        </Text>
    );
}

interface LessonListItemButtonProps {
    /**
     * Button text
     */
    children: string;
    /**
     * Callback when button is pressed
     */
    onPress?: () => void;
    /**
     * Style override
     */
    style?: StyleProp<ViewStyle>;
}

function LessonListItemButton(props: LessonListItemButtonProps) {
    const { children, onPress, style: $styleOverride } = props;
    const { themed } = useAppTheme();

    return (
        <PressableScale
            style={[themed($button), $styleOverride]}
            onPress={onPress}
        >
            <Text style={themed($buttonText)} size="sm" weight="semiBold">
                {children}
            </Text>
        </PressableScale>
    );
}

// Styles
const $container: ThemedStyle<ViewStyle> = (theme) => ({
    backgroundColor: theme.colors.palette.neutral100,
    borderRadius: theme.roundness * 1.5,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.palette.neutral300,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.sm,
});

const $disabledContainer: ThemedStyle<ViewStyle> = (theme) => ({
    opacity: 0.5,
});

const $iconContainer: ThemedStyle<ViewStyle> = (theme) => ({
    width: 56,
    height: 56,
    backgroundColor: theme.colors.palette.neutral200,
    borderRadius: theme.roundness,
    justifyContent: "center",
    alignItems: "center",
});

const $iconStyle: ImageStyle = {
    width: 40,
    height: 40,
};

const $content: ViewStyle = {
    flex: 1,
    gap: 4,
};

const $title: ThemedStyle<TextStyle> = (theme) => ({
    color: theme.colors.text,
});

const $reward: ThemedStyle<TextStyle> = (theme) => ({
    color: theme.colors.textDim,
});

const $label: ThemedStyle<TextStyle> = (theme) => ({
    color: theme.colors.palette.accent500,
    letterSpacing: 0.5,
    textTransform: "uppercase",
});

const $button: ThemedStyle<ViewStyle> = (theme) => ({
    backgroundColor: theme.colors.palette.accent500,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.roundness,
    alignSelf: "flex-start",
});

const $buttonText: ThemedStyle<TextStyle> = () => ({
    color: "#FFFFFF",
});

// Attach sub-components
LessonListItem.Icon = LessonListItemIcon;
LessonListItem.Content = LessonListItemContent;
LessonListItem.Title = LessonListItemTitle;
LessonListItem.Reward = LessonListItemReward;
LessonListItem.Label = LessonListItemLabel;
LessonListItem.Button = LessonListItemButton;

export type {
    LessonListItemRootProps as LessonListItemProps,
    LessonListItemIconProps,
    LessonListItemContentProps,
    LessonListItemTitleProps,
    LessonListItemRewardProps,
    LessonListItemLabelProps,
    LessonListItemButtonProps,
};
