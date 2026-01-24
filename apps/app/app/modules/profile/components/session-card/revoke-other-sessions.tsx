import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "@/components";
import { StyleSheet, View } from "react-native";
import { useRevokeOtherSessions } from "../../hooks/mutations";
import { PressableScale } from "pressto";
import { ThemedViewStyle } from "@/theme";
import { useCallback } from "react";

export function RevokeOtherSessions() {
	const { revokeOtherSessions, isPending } = useRevokeOtherSessions();

	const {
		themed,
		theme: { colors },
	} = useAppTheme();

	const handleRevokeSessions = useCallback(() => {
		revokeOtherSessions();
	}, []);

	return (
		<View style={themed($root)}>
			<PressableScale
				onPress={handleRevokeSessions}
				style={styles.sessionRevokerButton}
				enabled={!isPending}
			>
				<Text
					style={{
						textDecorationLine: "underline",
						color: isPending ? colors.textDim : colors.palette.neutral900,
					}}
				>
					Revoke all Other
				</Text>
			</PressableScale>
			<Text>Session except current</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	sessionRevokerButton: {
		marginBottom: 2,
	},
});

const $root: ThemedViewStyle = (theme) => ({
	display: "flex",
	flexDirection: "row",
	gap: 4,
	alignItems: "flex-start",
	marginBottom: theme.spacing.md,
});
