import { useState, useMemo } from "react";
import { ListView, Text } from "@/components";
import { colors, spacing } from "@/theme";
import { StyleSheet, View } from "react-native";
import { ResultItem } from "@/components/calculator/ResultList";
import { SliderRow, sliderRowStyles } from "@/components/calculator/SliderRow";
import { calcPPF } from "@/utils/funcs";
import { CalcScreenWrapper } from "./CalcScreenWrapper";
import { CalcPieChart } from "@/components/calculator/CalcPieChart";

export const EpfCalcScreen = () => {
	const [yearlyContribution, setYearlyContribution] = useState(10_000);
	const [duration, setDuration] = useState(15); // Years

	const rate = 7.1; // will change

	const returns = useMemo(
		() => calcPPF({ yearlyContribution, rate, years: duration }),
		[yearlyContribution, rate, duration],
	);

	const investedAmnt = useMemo(
		() => yearlyContribution * duration,
		[yearlyContribution, duration],
	);

	const totalInterestEarned = useMemo(
		() => returns - investedAmnt,
		[returns, investedAmnt],
	);

	const pieData = useMemo(
		() => [
			{
				value: investedAmnt / returns,
				color: colors.palette.primary200,
				text: "Invested amount",
			},
			{
				value: totalInterestEarned / returns,
				color: colors.tint,
				text: "Estimated returns",
				focused: true,
			},
		],
		[investedAmnt, totalInterestEarned, returns],
	);

	const results = useMemo(
		() => [
			{ label: "Invested amount", value: investedAmnt },
			{
				label: "Total interest",
				value: totalInterestEarned,
			},
			{ label: "Maturity value", value: returns },
		],
		[investedAmnt, totalInterestEarned, returns],
	);

	const sliders = useMemo(
		() => [
			{
				label: "Total investment",
				value: yearlyContribution,
				setValue: setYearlyContribution,
				step: 100,
				minValue: 500,
				maxValue: 15_00_00,
			},
			{
				label: "Time Period (in Years)",
				value: duration,
				setValue: setDuration,
				step: 1,
				minValue: 15,
				maxValue: 50,
			},
		],
		[yearlyContribution, rate, duration],
	);

	return (
		<CalcScreenWrapper>
			<Text preset="heading" tx="epfScreen:title" />

			<CalcPieChart data={pieData} />

			{sliders.map((slider) => (
				<SliderRow key={slider.label} {...slider} />
			))}

			<View
				style={[
					sliderRowStyles.labelRow,
					{ marginBottom: spacing.xl, marginTop: spacing.xl },
				]}
			>
				<Text>Rate of interest</Text>
				<Text>{rate}%</Text>
			</View>

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
