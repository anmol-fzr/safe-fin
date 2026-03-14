import { Link } from "expo-router";
import type { TextStyle } from "react-native";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Text } from "@/components";
import { useListRadius } from "@/hooks/useListRadius";
import type { ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useQueryClient } from "@tanstack/react-query";
import { getCalculatorOpts } from "../../hooks/queries";

interface CalculatorListItemImplProps {
	id: number;
	title: string;
	desc: string;
	isFirst: boolean;
	isLast: boolean;
}

export function CalculatorListItemImpl(props: CalculatorListItemImplProps) {
	const { id, title, desc, isFirst, isLast } = props;
	const { themed } = useAppTheme();
	const queryClient = useQueryClient();
	const { getStyles } = useListRadius({});

	const styles = getStyles({ isFirst, isLast });

	const prefetchCalculator = () => {
		queryClient.prefetchQuery(getCalculatorOpts(id));
	};

	return (
		<Link
			onPressIn={prefetchCalculator}
			key={id}
			href={{
				pathname: "/(protected)/calculators/[calculatorId]",
				params: { calculatorId: id },
			}}
			style={[themed($calculatorListItem), styles]}
		>
			<View>
				<Text size="lg">{title}</Text>
				<Text size="xs" numberOfLines={1}>
					{desc}
				</Text>
			</View>
		</Link>
	);
}

CalculatorListItemImpl.Loading = () => (
	<SkeletonPlaceholder>
		<SkeletonPlaceholder.Item
			height={90}
			width="100%"
			borderRadius={24}
			marginBottom={12}
		/>
	</SkeletonPlaceholder>
);

const $calculatorListItem: ThemedStyle<TextStyle> = ({ spacing, colors }) => ({
	padding: spacing.md,
	paddingBottom: spacing.lg,
	backgroundColor: colors.successBackground,
	marginBottom: 2,
});
