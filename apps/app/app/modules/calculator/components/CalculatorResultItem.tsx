import { StyleSheet, View } from "react-native";
import Animated, {
	FadeInUp,
	FadeOutDown,
	FadingTransition,
} from "react-native-reanimated";
import { Text } from "@/components";
import { RollingCounter } from "@/components/shared/organisms/rolling-counter";
import { makeSpringy, spacing, typography } from "@/theme";
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
		<Animated.View layout={FadingTransition} style={styles.resultRow}>
			<Text style={styles.label}>{label}:</Text>
			<Text
				entering={makeSpringy(FadeInUp)}
				exiting={makeSpringy(FadeOutDown)}
				style={styles.resultText}
				key={value}
			>
				{currenctFmt.format(value)}
			</Text>

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
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	label: {
		fontFamily: typography.fonts.spaceGrotesk.semiBold,
		flex: 1,
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
