import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Pie, PolarChart } from "victory-native";
import { Text } from "@/components";
import { spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

type CalculatorPieChartProps = {
	data: {
		text: string;
		value: string;
	}[];
};

export const CalculatorPieChart = (props: CalculatorPieChartProps) => {
	const { data } = props;

	const {
		theme: { colors },
	} = useAppTheme();

	const pieColors = useMemo(
		() => [
			colors.palette.primary300,
			colors.palette.secondary300,
			colors.palette.neutral300,
		],
		[colors],
	);

	const getPieColor = useCallback(
		(indx: number) => pieColors[indx % pieColors.length],
		[pieColors],
	);

	const pieData = useMemo(
		() =>
			data.map((obj, index) => ({
				...obj,
				color: getPieColor(index),
			})),
		[data, getPieColor],
	);

	return (
		<View style={styles.root}>
			<View style={styles.chartContainer}>
				<PolarChart
					data={pieData}
					labelKey="text"
					valueKey="value"
					colorKey="color"
				>
					<Pie.Chart startAngle={270} innerRadius="40%" />
				</PolarChart>
			</View>

			<View style={styles.chartLegendContainer}>
				{pieData.map((item) => (
					<View key={item.text} style={styles.legendRow}>
						<View
							style={[styles.legendColorBox, { backgroundColor: item.color }]}
						/>
						<Text>{item.text}</Text>
					</View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		alignSelf: "center",
		alignItems: "center",
		marginVertical: spacing.lg,
	},
	chartContainer: {
		width: "75%",
		maxWidth: 500,
		aspectRatio: 1,
		marginInline: "auto",
	},
	chartLegendContainer: {
		flexDirection: "row",
		gap: spacing.md,
		flexWrap: "wrap",
		marginTop: spacing.sm,
		alignSelf: "center",
		justifyContent: "center",
	},
	legendRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.xs,
	},
	legendColorBox: {
		height: 18,
		aspectRatio: 1.6,
		borderRadius: 12,
	},
});
