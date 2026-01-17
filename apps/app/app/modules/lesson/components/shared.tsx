import { PressableScale } from "pressto";
import {
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from "react-native";
import { Text } from "@/components/Text";
import { type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

// Shared Button Component
interface SharedButtonProps {
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

export function SharedButton(props: SharedButtonProps) {
    const { children, onPress, style: $styleOverride } = props;
    const { themed } = useAppTheme();

    return (
        <PressableScale style={[themed($button), $styleOverride]} onPress={onPress}>
            <Text style={themed($buttonText)} size="md" weight="semiBold">
                {children}
            </Text>
        </PressableScale>
    );
}

const $button: ThemedStyle<ViewStyle> = (theme) => ({
    backgroundColor: theme.colors.palette.accent500,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.roundness * 1.5,
    alignItems: "center",
    justifyContent: "center",
});

const $buttonText: ThemedStyle<TextStyle> = () => ({
    color: "#FFFFFF",
});

export type { SharedButtonProps };
