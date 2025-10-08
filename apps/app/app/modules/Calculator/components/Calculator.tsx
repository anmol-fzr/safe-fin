import { getEmptyArr } from "@safe-fin/ui/utils";
import { Parser } from "expr-eval";
import { Suspense, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ListView, Text } from "@/components";
import {
	CalculatorResultItem,
	CalculatorSlider,
} from "@/modules/Calculator/components";
import { colors, spacing } from "@/theme";
import type { ResourceId } from "@/types";
import type { SliderConfig } from "@/utils/const";
import { useGetCalculator } from "../hooks/queries";

type Input = Record<string, number>;

type GetInitResultFromConfig = {
	input: Input;
	calculate: Record<string, string>;
};

const parser = new Parser();
function calculateExpr(expression: string, input: Input) {
	return parser.parse(expression).evaluate(input);
}

const getInitResultFromConfig = ({
	input,
	calculate,
}: GetInitResultFromConfig) => {
	const obj: Input = {};
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

const loadingSliders = getEmptyArr(3);

export function Calculator({ id }: { id: ResourceId }) {
	return (
		<Suspense fallback={CalculatorImpl.Loading}>
			<CalculatorImpl id={id} />
		</Suspense>
	);
}

function CalculatorImpl({ id }: { id: ResourceId }) {
	const { calculator } = useGetCalculator(id);

	const {
		title,
		calculate,
		sliders,
		//constants,
		resultKeys,
		// pieChart,
	} = calculator;

	const [formState, setFormState] = useState(() =>
		getInitStateFromSliders(sliders),
	);

	const onSliderChange = (key: string) => (val: number) => {
		setFormState((prev) => ({ ...prev, [key]: val }));
	};

	const resultData = useMemo(() => {
		const result = getInitResultFromConfig({ input: formState, calculate });
		return result;
	}, [formState, calculate]);

	type Option = {
		label: string;
		value: number;
	};
	type Options = Option[];

	const resultList = useMemo(() => {
		const arr: Options = [];
		Object.entries(resultKeys).forEach(([key, value]) => {
			arr.push({
				label: value,
				value: resultData[key],
			});
		});
		return arr;
	}, [resultData, resultKeys]);

	return (
		<>
			<Text preset="heading" text={title} />

			{/*
			{pieChart && (
				<CalculatorPieChart
					data={[
						{
							value: 10000,
							color: colors.palette.success,
							text: "Invested amount",
						},
						{
							value: 1200,
							color: colors.palette.successBackground,
							text: "Estimated returns",
						},
					]}
				/>
			)}
      */}

			{sliders.map((slider) => (
				<CalculatorSlider
					{...slider}
					key={slider.key}
					value={formState[slider.key]}
					setValue={onSliderChange(slider.key)}
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
				data={resultList}
				keyExtractor={(item) => item.label}
				renderItem={({ item }) => <CalculatorResultItem {...item} />}
			/>
		</>
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

CalculatorImpl.Loading = (
	<SkeletonPlaceholder>
		<View style={{ gap: 12 }}>
			<SkeletonPlaceholder.Item height={50} borderRadius={15} width="75%" />

			<SkeletonPlaceholder.Item
				borderRadius="50%"
				style={{ margin: "auto" }}
				height={250}
				aspectRatio={1}
			/>

			<View style={{ gap: 8, marginTop: 24 }}>
				{loadingSliders.map((slider) => (
					<SkeletonPlaceholder.Item
						key={slider}
						height={48}
						borderRadius={15}
						style={{ margin: "auto" }}
						width="95%"
					/>
				))}
			</View>
		</View>
	</SkeletonPlaceholder>
);
