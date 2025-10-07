import { createContext, useCallback, useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ListView, Text } from "@/components";
import { useSet } from "@/hooks";
import type { Scam } from "@/modules/scam/api";
import { useGetScams } from "@/modules/scam/hooks/queries";
import { useScamNavigation } from "@/modules/scam/navigator";
import { spacing } from "@/theme";
import { MissingContextError } from "@/utils/error";

type ScamListContext = ReturnType<typeof useSet<string>>;
const scamListContext = createContext<ScamListContext | null>(null);

const useScamList = () => {
	const ctx = useContext(scamListContext);
	if (ctx === null || ctx === undefined) {
		throw new MissingContextError("useScamList", "ScamListProvider");
	}
	return ctx;
};

const ScamListProvider = scamListContext.Provider;

export { ScamListProvider, useScamList };

export function ScamList() {
	const set = useSet<string>();
	const { scams } = useGetScams();

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

	const navigation = useScamNavigation();

	const handleScamPress = useCallback(() => {
		navigation.push("Scam", {
			scamId: scam.id,
		});
	}, [navigation, scam.id]);

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
