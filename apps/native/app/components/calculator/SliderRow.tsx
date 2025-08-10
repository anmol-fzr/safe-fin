import { useCallback, memo, useTransition, useMemo } from "react";
import { Text, TextField } from "@/components";
import { colors, spacing } from "@/theme";
import Slider from "@react-native-community/slider";
import { View, StyleSheet } from "react-native";
import { debounce } from "lodash";

type SliderRowProps = {
	label: string;
	value: number;
	setValue: (val: number) => void;
	step: number;
	minValue: number;
	maxValue: number;
};

export const SliderRow = memo(
	({ label, value, step, setValue, minValue, maxValue }: SliderRowProps) => {
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
					minimumTrackTintColor={colors.tint}
					thumbTintColor={colors.textDim}
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
