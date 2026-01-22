import { Button } from "@/components/Button";
import { useAppTheme } from "@/utils/useAppTheme";
import { useAuth } from "../hooks/useAuth";

export function LogoutButton() {
	const { handleLogout } = useAuth();

	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<Button
			onPress={handleLogout}
			preset="filled"
			style={{ backgroundColor: colors.errorBackground }}
			textStyle={{ color: colors.error }}
		>
			Logout
		</Button>
	);
}
