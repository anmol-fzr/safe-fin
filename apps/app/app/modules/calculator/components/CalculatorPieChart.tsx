import { memo } from "react";
import { StyleSheet, View } from "react-native";
import type { pieDataItem } from "react-native-gifted-charts";
import { PieChart } from "react-native-gifted-charts";
import { Text } from "@/components";
import { colors, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

type CalculatorPieChartProps = {
	data: pieDataItem[];
};

export const pieColors = [
	colors.palette.primary300,
	colors.palette.secondary300,
	colors.palette.neutral300,
];

export const getPieColor = (indx: number) => pieColors[indx % pieColors.length];

export const CalculatorPieChart = memo(({ data }: CalculatorPieChartProps) => {
	const { themeContext } = useAppTheme();
	return (
		<View style={styles.chartContainer}>
			<PieChart
				data={data}
				donut
				backgroundColor={
					themeContext === "light" ? colors.background : colors.text
				}
			/>
			<View style={styles.chartLegendContainer}>
				{data.map((item) => (
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
});

const styles = StyleSheet.create({
	chartContainer: {
		alignSelf: "center",
		alignItems: "center",
		marginVertical: spacing.lg,
	},
	chartLegendContainer: {
		flexDirection: "row",
		gap: spacing.md,
		marginTop: spacing.sm,
		alignSelf: "center",
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
