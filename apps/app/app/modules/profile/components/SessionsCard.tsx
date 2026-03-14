import { Suspense } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components";
import { $styles, ThemedViewStyle } from "@/theme";
import { Section } from "@/components/Section";
import { SessionList } from "./session-card/session-list";
import { useAppTheme } from "@/utils/useAppTheme";

export function SessionsCard() {
	const { themed } = useAppTheme();
	return (
		<View style={themed($root)}>
			<Section>
				<Section.Header style={styles.header}>
					<Section.Title>Sessions</Section.Title>

					<Text>Manage your active sessions and revoke access</Text>
				</Section.Header>
				<Section.Body preset="default">
					<Suspense fallback={<SessionList.Loading />}>
						<SessionList />
					</Suspense>
				</Section.Body>
			</Section>
		</View>
	);
}

const $root: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.md,
	paddingHorizontal: $styles.container.paddingHorizontal,
});

const styles = StyleSheet.create({
	header: { flexDirection: "column", alignItems: "flex-start" },
});
