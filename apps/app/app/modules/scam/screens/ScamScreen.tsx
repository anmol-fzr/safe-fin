import { useGetScam } from "@scam/hooks/queries";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Screen, Text } from "@/components";
import { $styles, spacing } from "@/theme";

type ScamScreenProps = { scamId: number };

export function ScamScreen(props: ScamScreenProps) {
	const { scamId } = props;

	const router = useRouter();
	const { scam } = useGetScam(Number(scamId));

	if (scam === undefined) {
		console.warn("Got undefined Scam at ScamScreen, Navigaiting Back ...");
		return router.back();
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
