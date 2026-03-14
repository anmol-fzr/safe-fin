import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { FadeInUp } from "react-native-reanimated";
import { ListView, Text } from "@/components";
import type { ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

interface PublicProfileStatsProps {
	stats: {
		title: string;
		count: number;
	}[];
}

export function PublicProfileStats(props: PublicProfileStatsProps) {
	const { stats } = props;

	return (
		<View style={styles.root}>
			<ListView
				data={stats}
				numColumns={2}
				keyExtractor={(item) => item.title}
				renderItem={({ item }) => <Stat title={item.count} desc={item.title} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	root: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		flexWrap: "wrap",
	},
});

interface StatProps {
	title: ReactNode;
	desc: ReactNode;
}

const Stat = (props: StatProps) => {
	const { title, desc } = props;

	const { themed } = useAppTheme();

	return (
		<View style={themed($statRoot)}>
			<Text size="lg" weight="semiBold" entering={FadeInUp}>
				{title}
			</Text>
			<Text color="dim" size="xs" entering={FadeInUp}>
				{desc}
			</Text>
		</View>
	);
};

const $statRoot: ThemedViewStyle = (theme) => ({
	minWidth: 150,
	borderRadius: theme.roundness,
	padding: theme.spacing.sm,
	alignItems: "center",
});
