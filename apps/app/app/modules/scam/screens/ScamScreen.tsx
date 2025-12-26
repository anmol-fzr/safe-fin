import { useGetScam } from "@scam/hooks/queries";
import { Suspense } from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Screen, Text } from "@/components";
import { ViewTransition } from "@/components/view-transition";
import { $styles, spacing } from "@/theme";
import { ScamNotFoundScreen } from "./ScamNotFound";

type ScamScreenProps = { scamId: number };

export function ScamScreen(props: ScamScreenProps) {
	const { scamId } = props;

	return (
		<ViewTransition>
			<Suspense fallback={<ScamScreenImpl.Loading />}>
				<ScamScreenImpl scamId={scamId} />
			</Suspense>
		</ViewTransition>
	);
}

function ScamScreenImpl(props: ScamScreenProps) {
	const { scamId } = props;

	const { scam } = useGetScam(Number(scamId));

	//if (true) {
	if (scam === undefined) {
		console.warn("Got undefined Scam at ScamScreen, Navigaiting Back ...");
		return <ScamNotFoundScreen />;
	}

	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<Text preset="subheading" style={{ marginTop: 12 }}>
				{scam.title}
			</Text>
			<Text>{scam?.desc}</Text>
			<View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
				{scam.tags.map((tag) => {
					return (
						<View
							key={tag}
							style={{
								borderColor: "black",
								backgroundColor: "white",
								borderWidth: 1,
								padding: 2,
								paddingInline: 6,
								borderRadius: spacing.xxs,
							}}
						>
							<Text>{tag}</Text>
						</View>
					);
				})}
			</View>
		</Screen>
	);
}

ScamScreenImpl.Loading = () => {
	return (
		<Screen preset="scroll" contentContainerStyle={$styles.container}>
			<SkeletonPlaceholder>
				<SkeletonPlaceholder.Item
					height={24}
					marginTop={12}
					marginBottom={8}
					borderRadius={8}
				/>
				<SkeletonPlaceholder.Item
					height={14}
					marginBottom={2}
					borderRadius={6}
				/>
				<SkeletonPlaceholder.Item
					height={14}
					marginBottom={2}
					borderRadius={6}
				/>
				<SkeletonPlaceholder.Item
					height={14}
					marginBottom={2}
					borderRadius={6}
				/>
				<SkeletonPlaceholder.Item
					height={14}
					marginBottom={2}
					borderRadius={6}
				/>
			</SkeletonPlaceholder>
		</Screen>
	);
};
