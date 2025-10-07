import { Link } from "@react-navigation/native";
import { getEmptyArr } from "@safe-fin/ui/utils";
import { Suspense } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { ListItem, ListView, Text } from "@/components";
import { spacing } from "@/theme";
import { CALCULATOR_CONFIG, type CalcListItem } from "@/utils/const";
import { useAppTheme } from "@/utils/useAppTheme";
import { useGetCalculators } from "../hooks/queries";

const calcs: CalcListItem[] = [];

Object.keys(CALCULATOR_CONFIG).map((calcConfigKey) => {
	const config =
		CALCULATOR_CONFIG[calcConfigKey as keyof typeof CALCULATOR_CONFIG];
	calcs.push(config.list);
});

export const CalculatorList = () => {
	//const { theme } = useAppTheme();

	return (
		<>
			<Suspense fallback={<CalculatorListImpl.Loading />}>
				<CalculatorListImpl />
			</Suspense>
			{/*
		<ListView
			data={calcs}
			estimatedItemSize={113}
			keyExtractor={(item) => item.screen}
			renderItem={({ item: calc }) => (
				<Link
					screen="Calculator"
					params={{
						type: calc.screen,
					}}
					style={{
						padding: spacing.md,
						backgroundColor: theme.colors.successBackground,
						borderRadius: spacing.md,
						gap: spacing.xs,
						marginBottom: spacing.sm,
					}}
				>
					<Text preset="heading" size="xl">
						{calc.title}
					</Text>
					<Text style={{ fontSize: 14 }}>{calc.desc}</Text>
				</Link>
			)}
		/>
      */}
		</>
	);
};

function CalculatorListImpl() {
	const { calculators } = useGetCalculators();
	return (
		<ListView
			data={calculators}
			estimatedItemSize={113}
			keyExtractor={(item) => item.title}
			renderItem={({ item }) => (
				<CalculatorListItem
					screenType={item.list.screen}
					title={item.title}
					desc={item.list.desc}
				/>
			)}
		/>
	);
}

interface CalculatorListItemImplProps {
	screenType: string;
	title: string;
	desc: string;
}

function CalculatorListItem(props: CalculatorListItemImplProps) {
	const { screenType, title, desc } = props;
	const {
		theme: { colors, spacing },
	} = useAppTheme();
	return (
		<Link
			screen="Calculator"
			params={{
				type: screenType,
			}}
			style={{
				padding: spacing.md,
				backgroundColor: colors.successBackground,
				borderRadius: spacing.md,
				gap: spacing.xs,
				marginBottom: spacing.sm,
			}}
		>
			<Text preset="heading" size="xl">
				{title}
			</Text>
			{"\n"}
			<Text size="xs">{desc}</Text>
		</Link>
	);
}

CalculatorListItem.Loading = () => {
	const {
		theme: { colors, spacing },
	} = useAppTheme();
	return (
		<ListItem
			style={{
				padding: spacing.md,
				backgroundColor: colors.successBackground,
				borderRadius: spacing.md,
				gap: spacing.xs,
				marginBottom: spacing.sm,
			}}
		>
			<SkeletonPlaceholder>
				<SkeletonPlaceholder.Item height={32} width="90%" />
				<SkeletonPlaceholder.Item height={24} width="80%" />
			</SkeletonPlaceholder>
		</ListItem>
	);
};

const arr = getEmptyArr(6);

CalculatorListImpl.Loading = () => {
	return (
		<ListView
			data={arr}
			estimatedItemSize={113}
			keyExtractor={(item) => item.toString()}
			renderItem={CalculatorListItem.Loading}
		/>
	);
};
