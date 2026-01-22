import { PressableScale } from "pressto";
import type { ComponentType } from "react";
import {
	ActivityIndicator,
	type GestureResponderEvent,
	type PressableProps,
	type PressableStateCallbackType,
	type StyleProp,
	type TextStyle,
	type ViewStyle,
} from "react-native";
import type { ThemedStyle, ThemedStyleArray } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { $styles } from "../theme";
import { Text, type TextProps } from "./Text";

type Presets = "default" | "filled" | "reversed" | "text";

export interface ButtonAccessoryProps {
	style: StyleProp<any>;
	pressableState: PressableStateCallbackType;
	disabled?: boolean;
}

export interface ButtonProps
	extends Omit<
		PressableProps,
		"onPress" | "onPressIn" | "onPressOut" | "onLongPress"
	> {
	/**
	 * Handler to be called when the user taps the button.
	 */
	onPress?: (event: GestureResponderEvent) => void;
	/**
	 * Text which is looked up via i18n.
	 */
	tx?: TextProps["tx"];
	/**
	 * The text to display if not using `tx` or nested components.
	 */
	text?: TextProps["text"];
	/**
	 * Optional options to pass to i18n. Useful for interpolation
	 * as well as explicitly setting locale or translation fallbacks.
	 */
	txOptions?: TextProps["txOptions"];
	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: StyleProp<ViewStyle>;
	/**
	 * An optional style override for the "pressed" state.
	 */
	pressedStyle?: StyleProp<ViewStyle>;
	/**
	 * An optional style override for the button text.
	 */
	textStyle?: StyleProp<TextStyle>;
	/**
	 * An optional style override for the button text when in the "pressed" state.
	 */
	pressedTextStyle?: StyleProp<TextStyle>;
	/**
	 * An optional style override for the button text when in the "disabled" state.
	 */
	disabledTextStyle?: StyleProp<TextStyle>;
	/**
	 * One of the different types of button presets.
	 */
	preset?: Presets;
	/**
	 * An optional component to render on the right side of the text.
	 * Example: `RightAccessory={(props) => <View {...props} />}`
	 */
	RightAccessory?: ComponentType<ButtonAccessoryProps>;
	/**
	 * An optional component to render on the left side of the text.
	 * Example: `LeftAccessory={(props) => <View {...props} />}`
	 */
	LeftAccessory?: ComponentType<ButtonAccessoryProps>;
	/**
	 * Children components.
	 */
	children?: React.ReactNode;
	/**
	 * @deprecated Use `status="disabled"` instead. This prop will be removed sooner
	 * disabled prop, accessed directly for declarative styling reasons.
	 * https://reactnative.dev/docs/pressable#disabled
	 */
	disabled?: boolean;
	/**
	 * An optional style override for the disabled state
	 */
	disabledStyle?: StyleProp<ViewStyle>;
	/**
	 * Current Status of the Button e.g. Loading | Disabled
	 */
	status?: "loading" | "disabled";
	/**
	 * Text which is looked up via i18n.
	 */
	loadingTx?: TextProps["tx"];
	/**
	 * The text to display if not using `tx` or nested components.
	 */
	loadingText?: TextProps["text"];
	/**
	 * Optional options to pass to i18n. Useful for interpolation
	 * as well as explicitly setting locale or translation fallbacks.
	 */
	loadingTxOptions?: TextProps["txOptions"];
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Button/}
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button
 *   tx="common:ok"
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
	const {
		tx,
		text,
		txOptions,
		style: $viewStyleOverride,
		pressedStyle: $pressedViewStyleOverride,
		textStyle: $textStyleOverride,
		pressedTextStyle: $pressedTextStyleOverride,
		disabledTextStyle: $disabledTextStyleOverride,
		children,
		RightAccessory,
		LeftAccessory,
		disabled,
		status,
		disabledStyle: $disabledViewStyleOverride,
		loadingText = "Loading ...",
		loadingTx,
		loadingTxOptions,
		onPress,
		...rest
	} = props;

	if (disabled !== undefined) {
		console.warn(`disabled prop is deprecated Use status="disabled" instead.`);
	}

	const isLoading = status === "loading";

	const isDisabled = (disabled ?? status === "disabled") || status === "loading";

	const { themed } = useAppTheme();

	const preset: Presets = props.preset ?? "default";

	const baseViewStyle = [
		themed($viewPresets[preset]),
		$viewStyleOverride,
		isDisabled && $disabledViewStyleOverride,
	];

	const baseTextStyle = [
		themed($textPresets[preset]),
		$textStyleOverride,
		isDisabled && $disabledTextStyleOverride,
	];

	return (
		<PressableScale
			style={baseViewStyle}
			accessibilityRole="button"
			accessibilityState={{ disabled: !!isDisabled }}
			pointerEvents={isDisabled ? "none" : "auto"}
			onPress={onPress}
			activeScale={0.95}
			weight="light"
			{...rest}
		>
			{(params) => {
				// Extract the boolean value from SharedValue
				const pressed = params?.isPressed?.value ?? false;

				const viewStyleWithPressed = [
					...baseViewStyle,
					pressed &&
					themed([$pressedViewPresets[preset], $pressedViewStyleOverride]),
				];

				const textStyleWithPressed = [
					...baseTextStyle,
					pressed &&
					themed([$pressedTextPresets[preset], $pressedTextStyleOverride]),
				];

				const pressableState: PressableStateCallbackType = {
					pressed,
					hovered: false,
				};

				if (isLoading) {
					return (
						<>
							<ActivityIndicator />
							<Text
								tx={loadingTx}
								text={loadingText}
								txOptions={loadingTxOptions}
								style={[textStyleWithPressed, { marginLeft: 12 }]}
							>
								{children}
							</Text>
						</>
					);
				}

				return (
					<>
						{!!LeftAccessory && (
							<LeftAccessory
								style={$leftAccessoryStyle}
								pressableState={pressableState}
								disabled={isDisabled}
							/>
						)}

						<Text
							tx={tx}
							text={text}
							txOptions={txOptions}
							style={textStyleWithPressed}
						>
							{children}
						</Text>

						{!!RightAccessory && (
							<RightAccessory
								style={$rightAccessoryStyle}
								pressableState={pressableState}
								disabled={isDisabled}
							/>
						)}
					</>
				);
			}}
		</PressableScale>
	);
}

const $baseViewStyle: ThemedStyle<ViewStyle> = ({ spacing, roundness }) => ({
	minHeight: 56,
	borderRadius: roundness * 2.5,
	justifyContent: "center",
	alignItems: "center",
	paddingVertical: spacing.sm,
	paddingHorizontal: spacing.sm,
	overflow: "hidden",
});

const $baseTextStyle: ThemedStyle<TextStyle> = ({ typography }) => ({
	fontSize: 16,
	lineHeight: 20,
	fontFamily: typography.primary.medium,
	textAlign: "center",
	flexShrink: 1,
	flexGrow: 0,
	zIndex: 2,
});

const $rightAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginStart: spacing.xs,
	zIndex: 1,
});
const $leftAccessoryStyle: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginEnd: spacing.xs,
	zIndex: 1,
});

const $viewPresets: Record<Presets, ThemedStyleArray<ViewStyle>> = {
	default: [
		$styles.row,
		$baseViewStyle,
		({ colors }) => ({
			borderWidth: 1,
			borderColor: colors.palette.neutral400,
			backgroundColor: colors.palette.neutral100,
		}),
	],
	filled: [
		$styles.row,
		$baseViewStyle,
		({ colors }) => ({ backgroundColor: colors.palette.neutral300 }),
	],
	reversed: [
		$styles.row,
		$baseViewStyle,
		({ colors }) => ({ backgroundColor: colors.palette.neutral800 }),
	],
	text: [$styles.row, $baseViewStyle],
};

const $textPresets: Record<Presets, ThemedStyleArray<TextStyle>> = {
	text: [$baseTextStyle],
	default: [$baseTextStyle],
	filled: [$baseTextStyle],
	reversed: [
		$baseTextStyle,
		({ colors }) => ({ color: colors.palette.neutral100 }),
	],
};

const $pressedViewPresets: Record<Presets, ThemedStyle<ViewStyle>> = {
	default: ({ colors }) => ({ backgroundColor: colors.palette.neutral200 }),
	filled: ({ colors }) => ({ backgroundColor: colors.palette.neutral400 }),
	reversed: ({ colors }) => ({ backgroundColor: colors.palette.neutral700 }),
	text: () => ({ opacity: 0.9 }),
};

const $pressedTextPresets: Record<Presets, ThemedStyle<TextStyle>> = {
	default: () => ({ opacity: 0.9 }),
	filled: () => ({ opacity: 0.9 }),
	reversed: () => ({ opacity: 0.9 }),
	text: () => ({ opacity: 0.9 }),
};
