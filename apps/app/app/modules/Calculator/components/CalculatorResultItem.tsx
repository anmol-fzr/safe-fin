import { StyleSheet, View } from "react-native";
import { Text } from "@/components";
import { spacing, typography } from "@/theme";
import { currenctFmt } from "@/utils/funcs";

type CalculatorResultItemProps = {
	label: string;
	value: number;
};

export const CalculatorResultItem = ({
	label,
	value,
}: CalculatorResultItemProps) => {
	//const { themeContext } = useAppTheme();
	return (
		<View style={styles.resultRow}>
			<Text style={styles.label}>{label}:</Text>
			<Text style={styles.resultText}>{currenctFmt.format(value)}</Text>

			{/*
        <AnimatedRollingNumber
          value={value}
          formattedText={currenctFmt.format(value)}
          textStyle={[
            styles.resultText,
            {
              color: themeContext === "light" ? colors.text : colors.background,
            },
          ]}
          spinningAnimationConfig={{ duration: 300, easing: Easing.bounce }}
        />
        */}
		</View>
	);
};

const styles = StyleSheet.create({
	label: {
		fontFamily: typography.fonts.spaceGrotesk.semiBold,
	},
	resultsContainer: {
		marginTop: spacing.xl,
		gap: spacing.md,
	},
	resultRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	resultText: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: typography.fonts.spaceGrotesk.semiBold,
	},
});
