import { Text, TextProps } from "@/components";
import {
	Section,
	SectionBodyProps,
	SectionTitleProps,
} from "@/components/Section";
import { useAppTheme } from "@/utils/useAppTheme";
import { View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

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

	return (
		<Text
			size="xs"
			weight="semiBold"
			style={[
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
			]}
			{...rest}
		/>
	);
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
