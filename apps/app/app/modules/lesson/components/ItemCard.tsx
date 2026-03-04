import { Lock1, Play, TickCircle } from "iconsax-react-nativejs";
import { StyleSheet, View, type ViewProps } from "react-native";
import { Text } from "@/components/Text";
import { IconSax } from "@/context/IconContext";
import { useAppTheme } from "@/utils/useAppTheme";
import { CompletedBadge } from "./CompletedBadge";

interface ItemCardProps extends ViewProps {
	title: string;
	points: number;
	status: "LOCKED" | "UNLOCKED" | "COMPLETED";
}

export function ItemCard(props: ItemCardProps) {
	const { title, points, status, style: $styleOverride, ...rest } = props;

	const isLocked = status === "LOCKED";
	const isCompleted = status === "COMPLETED";

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	return (
		<View
			style={[
				{
					flexDirection: "row",
					alignItems: "center",
					padding: 12,
					borderWidth: 1,
					backgroundColor: colors.palette.neutral100,
					borderColor: isCompleted ? colors.success : colors.palette.neutral300,
					borderRadius: 12,
				},
				$styleOverride,
			]}
			{...rest}
		>
			<View style={styles.textWrapper}>
				<Text weight="medium" size="sm" color={isLocked ? "dim" : "default"}>
					{title}
				</Text>

				<View style={{ flexDirection: "row", gap: spacing.md }}>
					<Text color="dim" size="xs" weight="semiBold">
						{points} PX
					</Text>
					{isCompleted && <CompletedBadge />}
				</View>
			</View>

			{status === "LOCKED" && <IconSax icon={Lock1} color={colors.textDim} />}
			{status === "COMPLETED" && (
				<IconSax icon={TickCircle} color={colors.success} />
			)}
			{status === "UNLOCKED" && <IconSax icon={Play} color={colors.tint} />}
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: "row",
		alignItems: "center",
		padding: 12,
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 12,
	},
	// iconWrapper: {
	// 	width: 48,
	// 	height: 48,
	// 	backgroundColor: "#F5F5F5",
	// 	borderRadius: 8,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	marginRight: 12,
	// },
	// icon: {
	// 	width: 24,
	// 	height: 24,
	// },
	textWrapper: {
		flex: 1,
		marginRight: 16,
	},
});
