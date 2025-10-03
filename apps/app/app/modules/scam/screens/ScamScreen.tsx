import { Text, Screen, GoBack } from "@/components";
import { View } from "react-native";
import { $styles, spacing } from "@/theme";
import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { ScamStackScreenProps } from "../navigator";

type Props = ScamStackScreenProps<"Scam">;

export function ScamScreen(props: Props) {
	const { scamId } = props.route.params;

	const { isPending, data: scam } = useQuery({
		queryKey: ["SCAMS", scamId],
		queryFn: () => API.SCAM.ONE(scamId),
	});

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="scamScreen:title" />
			{isPending ? (
				<></>
			) : (
				<>
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
				</>
			)}
		</Screen>
	);
}
