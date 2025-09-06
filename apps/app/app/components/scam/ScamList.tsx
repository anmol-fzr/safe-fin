import { useCallback } from "react";
import { Text, ListView } from "@/components";
import { View, Pressable, StyleSheet } from "react-native";
import { spacing } from "@/theme";
import { useNavigation } from "@react-navigation/native";
import { useSet } from "@/hooks";
import { Scam } from "@/services/api/scam";
import { useScamList, ScamListProvider } from "@/context/ScamContext";
import { useScams } from "@/hooks/query/scam";

export function ScamList() {
	const set = useSet<string>();
	const { isPending, data: scams } = useScams();

	return (
		<ScamListProvider value={set}>
			<ListView
				data={scams}
				estimatedItemSize={113}
				keyExtractor={(item) => `${item.id.toString()}-${set.set.size}`}
				renderItem={({ item }) => <ScamListItem scam={item} />}
			/>
		</ScamListProvider>
	);
}

type ScamListItemProps = {
	scam: Scam;
};

function ScamListItem({ scam }: ScamListItemProps) {
	const { set: activeTags, toggle: toggleTag } = useScamList();

	const navigation = useNavigation();

	const handleScamPress = useCallback(() => {
		navigation.navigate("Scam", {
			scamId: scam.id,
		});
	}, []);

	return (
		<Pressable onPress={handleScamPress} style={styles.scamListItem}>
			<Text style={{ fontSize: 24, fontWeight: "heavy" }}>{scam.title}</Text>
			<Text style={{ fontSize: 14 }} numberOfLines={2}>
				{scam.desc}
			</Text>
			<View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
				{scam.tags.map((tag) => {
					const isActive = activeTags.has(tag);
					const handlePress = () => toggleTag(tag);
					return (
						<Pressable
							key={tag}
							style={{
								borderColor: isActive ? "pink" : "black",
								backgroundColor: isActive ? "pink" : "white",
								borderWidth: 1,
								padding: 2,
								paddingInline: 6,
								borderRadius: spacing.xxs,
							}}
							onPress={handlePress}
						>
							<Text>{tag}</Text>
						</Pressable>
					);
				})}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	scamListItem: {
		borderWidth: 1,
		padding: spacing.md,
		borderRadius: spacing.md,
		gap: spacing.xs,
		marginBottom: spacing.md,
	},
});
