import { Parser } from "expr-eval";
import { Suspense, useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { FadeInUp, FadeOutDown } from "react-native-reanimated";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ListView, Text } from "@/components";
import { Section } from "@/components/Section";
import {
	CalculatorPieChart,
	CalculatorResultItem,
	CalculatorSlider,
} from "@/modules/calculator/components";
import { getEmptyArr } from "@/pkg/ui";
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
		try {
			obj[key] = calculateExpr(expression, { ...input, ...obj });
		} catch (error) {
			console.error(`Calculation error for ${key}:`, error);
			obj[key] = 0;
		}
	});
	return obj;
};

const getInitStateFromSliders = (sliders: SliderConfig[]) => {
	const state: Record<string, number> = {};
	sliders.forEach((slider) => {
		state[slider.key] = slider.value;
	});
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
		desc,
		calculator: { calculate, sliders, resultKeys, pieData, pieChart },
	} = calculator;

	const [formState, setFormState] = useState(() =>
		getInitStateFromSliders(sliders),
	);

	const onSliderChange = useCallback((key: string) => {
		return (val: number) => {
			setFormState((prev) => ({ ...prev, [key]: val }));
		};
	}, []);

	const resultData = useMemo(
		() => getInitResultFromConfig({ input: formState, calculate }),
		[formState, calculate],
	);

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
		<View>
			<Text
				preset="heading"
				size="xl"
				entering={FadeInUp}
				exiting={FadeOutDown.duration(50)}
				text={title}
			/>
			<Text
				preset="subheading"
				size="md"
				entering={FadeInUp.delay(50)}
				exiting={FadeOutDown.duration(50).delay(50)}
				text={desc}
			/>

			{pieChart && pieData && pieData?.length > 0 && (
				<CalculatorPieChart
					data={
						pieData?.map((pieDataObj) => {
							return {
								text: pieDataObj.text,
								value: resultData[pieDataObj.valueKey].toString(),
							};
						}) ?? []
					}
				/>
			)}

			<Section>
				<Section.Body preset="filled">
					<ListView
						data={sliders}
						keyExtractor={(item) => item.key}
						contentContainerStyle={{ marginTop: 24 }}
						renderItem={({ item }) => {
							const { key: _key, ...rest } = item;
							const value = formState[item.key];
							const setValue = onSliderChange(item.key);
							return (
								<CalculatorSlider {...rest} value={value} setValue={setValue} />
							);
						}}
					/>
				</Section.Body>
			</Section>

			<Section>
				<Section.Body>
					<ListView
						style={styles.resultsContainer}
						data={resultList}
						contentContainerStyle={{ gap: 6 }}
						keyExtractor={(item) => item.label}
						renderItem={({ item }) => <CalculatorResultItem {...item} />}
					/>
				</Section.Body>
			</Section>
		</View>
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
