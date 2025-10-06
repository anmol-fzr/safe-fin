import { useGetScam } from "@scam/hooks/queries";
import { type ScamStackScreenProps, useScamNavigation } from "@scam/navigator";
import { View } from "react-native";
import { GoBack, Screen, Text } from "@/components";
import { $styles, spacing } from "@/theme";

type Props = ScamStackScreenProps<"Scam">;

export function ScamScreen(props: Props) {
	const { scamId } = props.route.params;

	const navigation = useScamNavigation();
	const { scam } = useGetScam(Number(scamId));

	if (scam === undefined) {
		console.error("Got undefined Scam at ScamScreen, Navigaiting Back ...");
		return navigation.goBack();
	}

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="scamScreen:title" />
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
