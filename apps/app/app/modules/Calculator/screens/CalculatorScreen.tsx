import { Parser } from "expr-eval";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListView, Text } from "@/components";
import {
	CalculatorPieChart,
	CalculatorResultItem,
	CalculatorScreenWrapper,
	CalculatorSlider,
	sliderRowStyles,
} from "@/modules/Calculator/components";
import { colors, spacing } from "@/theme";
import { CALCULATOR_CONFIG, type SliderConfig } from "@/utils/const";
import { useGetCalculator } from "../hooks/queries";
import type { CalculatorStackScreenProps } from "../navigator";

type CalculatorScreenProps = CalculatorStackScreenProps<"Calculator">;

const calculator = {
	id: 1,
	title: "SIP Calculator",
	list: {
		title: "SIP",
		desc: "Calculate how much you need to save or how much you will accumulate with your SIP",
		screen: "SIP",
	},
	sliders: [
		{
			label: "Monthly Investment",
			key: "investment",
			value: 25000,
			step: 100,
			minValue: 100,
			maxValue: 1000000,
		},
		{
			label: "Expected Return Rate (p.a)",
			key: "rate",
			value: 12,
			step: 0.1,
			minValue: 1,
			maxValue: 30,
		},
		{
			label: "Time Period (in Years)",
			key: "duration",
			value: 10,
			step: 1,
			minValue: 1,
			maxValue: 40,
		},
	],
	resultKeys: {
		totalInvested: "Total Invested",
		returns: "Returns",
		totalValue: "Total Value",
	},
	pieChart: true,
	calculate: {
		totalValue:
			"investment * (((1 + rate/1200) ^ (duration*12) - 1) / (rate/1200)) * (1 + rate/1200)",
		totalInvested: "investment * duration * 12",
		returns:
			"(investment * (((1 + rate/1200) ^ (duration*12) - 1) / (rate/1200)) * (1 + rate/1200)) - (investment * duration * 12)",
	},
};

type GetInitResultFromConfig = {
	input: Record<string, string>;
	calculate: Record<string, string>;
};

const parser = new Parser();
function calculateExpr(expression: string, input: Record<string, string>) {
	return parser.parse(expression).evaluate(input);
}

const getInitResultFromConfig = ({
	input,
	calculate,
}: GetInitResultFromConfig) => {
	const obj: Record<string, number> = {};
	Object.entries(calculate).forEach(([key, expression]) => {
		obj[key] = calculateExpr(expression, input);
	});
	return obj;
};

const getInitStateFromSliders = (sliders: SliderConfig[]) => {
	const state: Record<string, number> = {};
	sliders.forEach((slider) => {
		state[slider.key] = slider.value;
	});
	// if (constants && constants?.length > 0) {
	// 	constants.forEach((s) => {
	// 		state[s.key] = s.value;
	// 	});
	// }
	return state;
};

export function CalculatorScreen(props: CalculatorScreenProps) {
	const {
		title,
		calculate,
		sliders,
		//constants,
		resultKeys,
		pieChart,
	} = calculator;

	const initialState = useMemo(() => {
		const state: Record<string, number> = {};
		sliders.forEach((s) => {
			state[s.key] = s.value;
		});
		// if (constants && constants?.length > 0) {
		// 	constants.forEach((s) => {
		// 		state[s.key] = s.value;
		// 	});
		// }
		return state;
	}, [sliders]);
	//}, [sliders, constants]);

	const [formState, setFormState] = useState(() =>
		getInitStateFromSliders(sliders),
	);

	const [result, setResult] = useState(() =>
		getInitResultFromConfig({ input: formState, calculate }),
	);

	const onSliderChange = (key: string, val: number) => {
		setFormState((prev) => ({ ...prev, [key]: val }));
	};

	//const result = useMemo(() => calculate(formState), [formState, calculate]);

	useEffect(() => {
		Object.entries(calculator.calculate).forEach(([key, expression]) => {
			const parser = new Parser();
			setResult((result) => ({
				...result,
				[key]: parser.parse(expression).evaluate(formState),
			}));
		});
	}, [formState]);

	const resultData = Object.entries(result).map(([label, value]) => ({
		label,
		value,
	}));

	console.log(result);
	return (
		<CalculatorScreenWrapper>
			<Text preset="heading" text={title} />

			{/*
			{pieChart && result.pieData ? (
				<CalculatorPieChart data={result.pieData} />
			) : null}
      */}

			{sliders.map((slider) => (
				<CalculatorSlider
					key={slider.key}
					label={slider.label}
					value={formState[slider.key]}
					setValue={(val) => onSliderChange(slider.key, val)}
					step={slider.step}
					minValue={slider.minValue}
					maxValue={slider.maxValue}
				/>
			))}

			{/*
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
      */}

			<ListView
				style={styles.resultsContainer}
				data={resultData}
				keyExtractor={(item) => item.label}
				renderItem={({ item }) => <CalculatorResultItem {...item} />}
			/>
		</CalculatorScreenWrapper>
	);
}

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
