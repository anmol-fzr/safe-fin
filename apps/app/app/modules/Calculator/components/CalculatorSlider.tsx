import Slider from "@react-native-community/slider";
import { memo, useCallback, useMemo, useTransition } from "react";
import { StyleSheet, type TextStyle, View } from "react-native";
import { Text, TextField } from "@/components";
import { spacing, type ThemedStyle } from "@/theme";
import { debounce } from "@/utils/funcs";
import { useAppTheme } from "@/utils/useAppTheme";

type CalculatorSliderProps = {
	label: string;
	value: number;
	setValue: (val: number) => void;
	step: number;
	append?: string;
	prepend?: string;
	disabled?: boolean;
	minValue: number;
	maxValue: number;
};

export const CalculatorSlider = memo((props: CalculatorSliderProps) => {
	const {
		label,
		append = "",
		prepend = "",
		value,
		step,
		setValue,
		minValue,
		maxValue,
		disabled = false,
	} = props;

	const [isPending, startTransition] = useTransition();

	const onValueChange = useCallback(
		(val: number) => {
			startTransition(() => {
				setValue(val);
			});
		},
		[setValue],
	);

	const debouncedSetValue = useMemo(
		() =>
			debounce((val: number) => {
				startTransition(() => {
					setValue(val);
				});
			}, 300),
		[setValue],
	);

	const onInputChange = useCallback(
		(val: string) => {
			const numeric = Number(val);
			if (!Number.isNaN(numeric)) {
				debouncedSetValue(numeric);
			}
		},
		[debouncedSetValue],
	);

	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	return (
		<View style={styles.sliderContainer}>
			<View style={styles.labelRow}>
				<Text>{label}</Text>
				<TextField
					value={value.toString()}
					LeftAccessory={() => <Text>{prepend}</Text>}
					RightAccessory={() => <Text>{append}</Text>}
					status={isPending || disabled ? "disabled" : undefined}
					onChangeText={onInputChange}
					containerStyle={styles.inputContainer}
					style={themed($textField)}
					inputWrapperStyle={styles.inputWrapperStyle}
				/>
			</View>

			{!disabled && (
				<Slider
					style={styles.slider}
					{...{ value, step, onValueChange }}
					minimumValue={minValue}
					maximumValue={maxValue}
					minimumTrackTintColor={colors.success}
					thumbTintColor={colors.successBackground}
					disabled={disabled}
					maximumTrackTintColor="#000000"
				/>
			)}
		</View>
	);
});

const $textField: ThemedStyle<TextStyle> = ({ colors }) => ({
	height: 20,
	marginBottom: 0,
	textAlign: "right",
	color: colors.tint,
});

const styles = StyleSheet.create({
	sliderContainer: {
		marginTop: spacing.xl,
	},
	labelRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	inputContainer: {
		padding: 0,
		margin: 0,
		width: "auto",
		minWidth: 100,
		backgroundColor: "transparent",
	},
	slider: {
		height: 40,
	},
	inputWrapperStyle: {
		backgroundColor: "transparent",
		borderWidth: 0,
		alignItems: "flex-end",
		width: "auto",
		margin: 0,
		padding: 0,
	},
});

export { styles as sliderRowStyles };
