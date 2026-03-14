import { Button, ButtonProps } from "@/components/Button";
import { useAppTheme } from "@/utils/useAppTheme";
import { useAuth } from "../hooks/useAuth";
import { Logout as LogoutIcon } from "iconsax-react-nativejs";
import { IconSax } from "@/context/IconContext";

export function LogoutButton(props: ButtonProps) {
	const {
		style: $styleOverride,
		textStyle: $textStyleOverride,
		...rest
	} = props;
	const { handleLogout } = useAuth();

	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<Button
			onPress={handleLogout}
			preset="filled"
			style={[{ backgroundColor: colors.errorBackground }, $styleOverride]}
			textStyle={[{ color: colors.error }, $textStyleOverride]}
			tx="common:logOut"
			RightAccessory={() => (
				<IconSax
					icon={LogoutIcon}
					style={{ marginLeft: 12 }}
					size={20}
					color={colors.error}
				/>
			)}
			{...rest}
		/>
	);
}
