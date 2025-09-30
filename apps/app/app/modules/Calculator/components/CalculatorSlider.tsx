import Slider from "@react-native-community/slider";
import { debounce } from "lodash";
import { memo, useCallback, useMemo, useTransition } from "react";
import { StyleSheet, View } from "react-native";
import { Text, TextField } from "@/components";
import { spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

type CalculatorSliderProps = {
	label: string;
	value: number;
	setValue: (val: number) => void;
	step: number;
	minValue: number;
	maxValue: number;
};

export const CalculatorSlider = memo(
	({
		label,
		value,
		step,
		setValue,
		minValue,
		maxValue,
	}: CalculatorSliderProps) => {
		const [isPending, startTransition] = useTransition();

		const onChange = useCallback(
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
				if (!isNaN(numeric)) {
					debouncedSetValue(numeric);
				}
			},
			[debouncedSetValue],
		);

		const {
			theme: { colors },
		} = useAppTheme();

		return (
			<View style={styles.sliderContainer}>
				<View style={styles.labelRow}>
					<Text>{label}</Text>
					<TextField
						value={value.toString()}
						status={isPending ? "disabled" : undefined}
						onChangeText={onInputChange}
						containerStyle={styles.inputContainer}
					/>
				</View>

				<Slider
					style={styles.slider}
					value={value}
					onValueChange={onChange}
					step={step}
					minimumValue={minValue}
					maximumValue={maxValue}
					minimumTrackTintColor={colors.success}
					thumbTintColor={colors.successBackground}
					maximumTrackTintColor="#000000"
				/>
			</View>
		);
	},
);

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
		minWidth: 100,
	},
	slider: {
		height: 40,
	},
});

export { styles as sliderRowStyles };
