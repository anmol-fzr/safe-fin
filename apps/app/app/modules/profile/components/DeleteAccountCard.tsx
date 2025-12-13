import { View } from "react-native";
import { Button, Text } from "@/components";
import { $styles } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

export function DeleteAccountCard() {
	const {
		theme: { colors, spacing },
	} = useAppTheme();

	return (
		<View
			style={{
				gap: spacing.md,
				backgroundColor: colors.errorBackground,
				padding: $styles.container.paddingHorizontal,
			}}
		>
			<View
				style={{
					gap: spacing.xs,
				}}
			>
				<Text size="xl" weight="semiBold">
					Delete Account
				</Text>
				<Text>
					Permanently remove your account and all of its contents. This action
					is not reversible, so please continue with caution
				</Text>
			</View>

			<View
				style={{
					gap: spacing.xs,
				}}
			>
				<Button
					style={{
						marginRight: 0,
						marginLeft: "auto",
						paddingHorizontal: 20,
						borderWidth: 0,
						borderRadius: 12,
						backgroundColor: colors.error,
					}}
					textStyle={{ color: colors.background }}
				>
					Delete Account
				</Button>
			</View>
		</View>
	);
}
