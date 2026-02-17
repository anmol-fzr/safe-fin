import { Lock1, Play, TickCircle } from "iconsax-react-nativejs";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/Text";
import { IconSax } from "@/context/IconContext";
import { useAppTheme } from "@/utils/useAppTheme";
import { CompletedBadge } from "./CompletedBadge";
import { NumericBool } from "@/services/axios";

type ItemCardProps = {
	title: string;
	points: number;
	status: "LOCKED" | "UNLOCKED" | "COMPLETED";
};

export function ItemCard(props: ItemCardProps) {
	const { title, points, status } = props;

	const isLocked = status === "LOCKED";
	const isCompleted = status === "COMPLETED";

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				padding: 12,
				borderWidth: 1,
				backgroundColor: colors.palette.neutral100,
				borderColor: isCompleted ? colors.success : colors.palette.neutral200,
				borderRadius: 12,
			}}
		>
			<View style={styles.textWrapper}>
				<Text
					weight="medium"
					size="sm"
					style={{
						color: isLocked ? colors.textDim : colors.text,
					}}
				>
					{title}
				</Text>

				<View style={{ flexDirection: "row", gap: spacing.md }}>
					<Text style={{ color: colors.textDim }} size="xs" weight="semiBold">
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
