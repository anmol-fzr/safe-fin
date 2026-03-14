import { StyleSheet, View } from "react-native";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { Text, type TextProps } from "@/components";
import {
	Section,
	type SectionBodyProps,
	type SectionTitleProps,
} from "@/components/Section";
import { useAppTheme } from "@/utils/useAppTheme";

type PromoCardRootProps = SectionBodyProps;

function PromoCardRoot(props: PromoCardRootProps) {
	return <Section.Body preset="filled" {...props} />;
}

interface PromoCardBadgeProps extends TextProps {}

PromoCardRoot.Badge = (props: PromoCardBadgeProps) => {
	const { style: $styleOverride, ...rest } = props;
	const {
		theme: { colors, spacing, roundness },
	} = useAppTheme();

	const styles = StyleSheet.flatten([
		{
			backgroundColor: colors.palette.neutral100,
			padding: spacing.xxs,
			paddingInline: spacing.sm,
			borderRadius: roundness * 2,
			flex: 0,
			margin: "auto",
			marginLeft: 0,
			textAlign: "center",
			marginBottom: spacing.xs,
			textTransform: "uppercase",
		},
		$styleOverride,
	]);

	return <Text size="xs" weight="semiBold" style={styles} {...rest} />;
};

export interface PromoCardTitleProps extends SectionTitleProps {}
PromoCardRoot.Title = (props: PromoCardTitleProps) => {
	return <Section.Title numberOfLines={1} size="md" {...props} />;
};

export type PromoCardBodyProps = ViewProps;
PromoCardRoot.Body = (props: ViewProps) => {
	const {
		theme: { spacing },
	} = useAppTheme();

	return <View style={{ gap: spacing.lg }} {...props} />;
};

export const PromoCardImpl = Object.assign(PromoCardRoot, {
	Root: PromoCardRoot,
});
