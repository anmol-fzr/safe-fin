import { memo } from "react";
import { Text } from "@/components";
import { colors, spacing } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { View, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import type { pieDataItem } from "react-native-gifted-charts";

type CalcPieChartProps = {
	data: pieDataItem[];
};

export const CalcPieChart = memo(({ data }: CalcPieChartProps) => {
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
		width: 24,
		height: 12,
		borderRadius: 10,
	},
});
