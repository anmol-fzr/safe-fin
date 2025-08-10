import { useState, useMemo } from "react";
import { GoBack, ListView, Screen, Text } from "@/components";
import { $styles, spacing } from "@/theme";
import { StyleSheet } from "react-native";
import { ResultItem } from "@/components/calculator/ResultList";
import { SliderRow } from "@/components/calculator/SliderRow";
import { calcSwp } from "@/utils/funcs";
import { CalcScreenWrapper } from "./CalcScreenWrapper";

export const SwpCalcScreen = () => {
	const [totalInvestment, setTotalInvestment] = useState(5_00_000);
	const [withdrawlPM, setWithdrawlPM] = useState(10_000);
	const [rate, setRate] = useState(8);
	const [duration, setDuration] = useState(5); // Years

	const n = duration * 12;
	const i = rate / 12 / 100;

	const totalValue = useMemo(
		() => totalInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i),
		[totalInvestment, rate, duration],
	);

	const totalInvested = useMemo(
		() => totalInvestment * n,
		[totalInvestment, duration],
	);
	const returns = totalValue - totalInvested;

	const finalVal = calcSwp(totalInvestment, rate, duration, withdrawlPM);

	const results = useMemo(
		() => [
			{ label: "Total investment", value: totalInvestment },
			{ label: "Total Withdrawl", value: withdrawlPM * duration * 12 },
			{ label: "Final Value", value: finalVal },
		],
		[totalValue, totalInvested, returns, finalVal],
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
				label: "Withdrawl per month",
				value: withdrawlPM,
				setValue: setWithdrawlPM,
				step: 100,
				minValue: 500,
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
		[totalInvestment, withdrawlPM, rate, duration],
	);

	return (
		<CalcScreenWrapper>
			<Text preset="heading" tx="swpScreen:title" />

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
