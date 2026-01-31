import { Link, LinkProps } from "expo-router";
import { IconSax } from "@/context/IconContext";
import { useAppTheme } from "@/utils/useAppTheme";
import { ArrowLeft2 } from "iconsax-react-nativejs";
import { StyleSheet } from "react-native";
import { ThemedTextStyle } from "@/theme";

interface RoundBackIconProps extends LinkProps {}

export function RoundBackIcon(props: RoundBackIconProps) {
	const { style: $styleOverride, ...rest } = props;

	const { themed } = useAppTheme();

	return (
		<Link style={[themed($link), $styleOverride]} {...rest}>
			<IconSax icon={ArrowLeft2} style={styles.icon} />
		</Link>
	);
}

const styles = StyleSheet.create({
	icon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
});

const $link: ThemedTextStyle = (theme) => ({
	padding: 12,
	backgroundColor: theme.colors.palette.neutral200,
	marginLeft: theme.spacing.sm,
	borderRadius: 50,
	width: 50,
});
