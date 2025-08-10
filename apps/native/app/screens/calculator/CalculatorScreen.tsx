import { ScreenProps } from "@/navigators";
import { CalcScreenWrapper } from "./CalcScreenWrapper";
import { CALCULATOR_CONFIG } from "@/utils/const";
import { StyleSheet, View } from "react-native";
import { ListView, Text } from "@/components";
import { SliderRow, sliderRowStyles } from "@/components/calculator/SliderRow";
import { CalcPieChart } from "@/components/calculator/CalcPieChart";
import { useMemo, useState } from "react";
import { colors, spacing } from "@/theme";
import { ResultItem } from "@/components/calculator/ResultList";

type CalculatorScreenProps = ScreenProps<"Calculator">;

export const CalculatorScreen = (props: CalculatorScreenProps) => {
	const { title, calculate, sliders, constants, resultKeys, pieChart } =
		CALCULATOR_CONFIG[props.route.params.type];

	const initialState = useMemo(() => {
		const state: Record<string, number> = {};
		sliders.forEach((s) => (state[s.key] = s.value));
		if (constants && constants?.length > 0) {
			constants.forEach((s) => (state[s.key] = s.value));
		}
		return state;
	}, [sliders]);

	const [formState, setFormState] = useState(initialState);

	const onSliderChange = (key: string, val: number) => {
		setFormState((prev) => ({ ...prev, [key]: val }));
	};

	const result = useMemo(() => calculate(formState), [formState, calculate]);

	return (
		<CalcScreenWrapper>
			<Text preset="heading" text={title} />

			{pieChart && result.pieData ? (
				<CalcPieChart data={result.pieData} />
			) : null}

			{sliders.map((slider) => (
				<SliderRow
					key={slider.key}
					label={slider.label}
					value={formState[slider.key]}
					setValue={(val) => onSliderChange(slider.key, val)}
					step={slider.step}
					minValue={slider.minValue}
					maxValue={slider.maxValue}
				/>
			))}

			{constants?.map((vals) => (
				<View
					key={vals.key}
					style={[
						sliderRowStyles.labelRow,
						{ marginBottom: spacing.xl, marginTop: spacing.xl },
					]}
				>
					<Text>{vals.label}</Text>
					<Text>{vals.value}%</Text>
				</View>
			))}

			<ListView
				style={styles.resultsContainer}
				data={resultKeys.map((key) => ({
					label: key[1],
					value: result[key[0]],
				}))}
				keyExtractor={(item) => item.label}
				renderItem={({ item }) => <ResultItem {...item} />}
			/>
		</CalcScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: spacing.lg,
		paddingBottom: spacing.xxl,
	},
	resultsContainer: {
		marginTop: spacing.xl,
	},
	resultRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: spacing.sm,
		borderBottomColor: colors.border,
		borderBottomWidth: 1,
	},
});
