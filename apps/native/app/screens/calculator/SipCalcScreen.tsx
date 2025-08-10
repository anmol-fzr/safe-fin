import { useState, useMemo } from "react";
import { ListView, Text } from "@/components";
import { colors, spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { ResultItem } from "@/components/calculator/ResultList";
import { SliderRow } from "@/components/calculator/SliderRow";
import { CalcPieChart } from "@/components/calculator/CalcPieChart";
import { CalcScreenWrapper } from "./CalcScreenWrapper";

export const SipCalcScreen = () => {
	const [investment, setInvestment] = useState(25_000);
	const [rate, setRate] = useState(12);
	const [duration, setDuration] = useState(10); // Years

	const n = duration * 12;
	const i = rate / 12 / 100;

	const totalValue = useMemo(
		() => investment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i),
		[investment, rate, duration],
	);

	const totalInvested = useMemo(() => investment * n, [investment, duration]);
	const returns = totalValue - totalInvested;

	const pieData = useMemo(
		() => [
			{
				value: totalInvested / totalValue,
				color: colors.palette.primary200,
				text: "Invested amount",
			},
			{
				value: returns / totalValue,
				color: colors.tint,
				text: "Estimated returns",
			},
		],
		[totalValue, totalInvested, returns],
	);

	const results = [
		{ label: "Invested amount", value: totalInvested },
		{ label: "Estimated returns", value: returns },
		{ label: "Total Value", value: totalValue },
	];

	const sliders = useMemo(
		() => [
			{
				label: "Monthly Investment (in ₹)",
				value: investment,
				setValue: setInvestment,
				step: 100,
				minValue: 100,
				maxValue: 1_000_000,
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
		[investment, rate, duration],
	);

	return (
		<CalcScreenWrapper>
			<Text preset="heading" tx="sipScreen:title" />

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
