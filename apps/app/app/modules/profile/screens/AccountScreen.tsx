import { View } from "react-native";
import { Screen } from "@/components";
import { LogoutButton } from "@/modules/auth/components/LogoutButton";
import { $styles, type ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { DeleteAccountCard, SessionsCard } from "../components";

export const AccountScreen = () => {
	const { themed } = useAppTheme();

	return (
		<Screen preset="scroll" safeAreaEdges={["bottom"]}>
			<SessionsCard />
			<DeleteAccountCard />
			<View style={themed($logoutBtn)}>
				<LogoutButton />
			</View>
		</Screen>
	);
};

const $logoutBtn: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.lg,
	padding: theme.spacing.sm,
	paddingTop: 24,
	paddingBottom: 96,
});
