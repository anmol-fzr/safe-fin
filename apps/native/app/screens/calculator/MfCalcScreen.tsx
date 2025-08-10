import { useState, useMemo } from "react";
import { ListView, Text } from "@/components";
import { colors, spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { ResultItem } from "@/components/calculator/ResultList";
import { SliderRow } from "@/components/calculator/SliderRow";
import { calcMF } from "@/utils/funcs";
import { CalcScreenWrapper } from "./CalcScreenWrapper";
import { CalcPieChart } from "@/components/calculator/CalcPieChart";

export const MfCalcScreen = () => {
	const [totalInvestment, setTotalInvestment] = useState(25_000);
	const [rate, setRate] = useState(12);
	const [duration, setDuration] = useState(10); // Years

	const returns = useMemo(
		() => calcMF(totalInvestment, rate, duration),
		[totalInvestment, rate, duration],
	);

	const totalValue = returns + totalInvestment;

	const pieData = useMemo(
		() => [
			{
				value: totalInvestment / totalValue,
				color: colors.palette.primary200,
				text: "Invested amount",
			},
			{
				value: returns / totalValue,
				color: colors.tint,
				text: "Estimated returns",
			},
		],
		[totalValue, totalInvestment, returns],
	);

	const results = useMemo(
		() => [
			{ label: "Invested amount", value: totalInvestment },
			{ label: "Estimated returns", value: returns },
			{ label: "Total value", value: totalValue },
		],
		[totalInvestment, returns, totalValue],
	);

	const sliders = useMemo(
		() => [
			{
				label: "Total investment",
				value: totalInvestment,
				setValue: setTotalInvestment,
				step: 100,
				minValue: 1000,
				maxValue: 10_000_000,
			},
			{
				label: "Expected Return Rate (p.a)",
				value: rate,
				setValue: setRate,
				step: 0.1,
				minValue: 1,
				maxValue: 30,
			},
			{
				label: "Time Period (in Years)",
				value: duration,
				setValue: setDuration,
				step: 1,
				minValue: 1,
				maxValue: 40,
			},
		],
		[totalInvestment, rate, duration],
	);

	return (
		<CalcScreenWrapper>
			<Text preset="heading" tx="mfScreen:title" />

			<CalcPieChart data={pieData} />

			{sliders.map((slider) => (
				<SliderRow key={slider.label} {...slider} />
			))}

			<ListView
				style={styles.resultsContainer}
				data={results}
				estimatedItemSize={36}
				keyExtractor={(item) => item.label}
				renderItem={({ item }) => <ResultItem {...item} />}
			/>
		</CalcScreenWrapper>
	);
};

const styles = StyleSheet.create({
	resultsContainer: {
		marginTop: spacing.xl,
		gap: spacing.md,
	},
});
