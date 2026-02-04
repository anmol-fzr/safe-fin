import { Link } from "expo-router";
import { Play, TickCircle } from "iconsax-react-nativejs";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/Text";
import { IconSax } from "@/context/IconContext";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Unit } from "../../api-types/course_one";
import { usePrefetchUnit } from "../../hooks/units/queries";
import { CourseCompleteBadge } from "../CourseCompletedBadge";

type UnitProps = {
	unit: Unit;
};

export const UnitBar = (props: UnitProps) => {
	const { unit } = props;

	const { id, content, points, isCompleted } = unit;

	const {
		theme: { colors, spacing },
	} = useAppTheme();

	const { prefetchUnit } = usePrefetchUnit();

	function handlePrefetchUnit() {
		prefetchUnit(id);
	}

	return (
		<Link
			onPressIn={handlePrefetchUnit}
			//href="/course/units/temp"
			href={{
				pathname: "/course/units/[unitId]",
				params: {
					unitId: id,
				},
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					padding: 12,
					borderWidth: 1,
					borderColor: isCompleted ? colors.success : "#E0E0E0",
					borderRadius: 12,
				}}
			>
				{/*
				<View style={styles.iconWrapper}>
					<Image
						source={{
							uri: "https://img.icons8.com/color/96/design.png",
						}}
						style={styles.icon}
					/>
				</View>
        */}
				<View style={styles.textWrapper}>
					<Text weight="medium" size="sm">
						{content.title}
					</Text>

					<View style={{ flexDirection: "row", gap: spacing.md }}>
						<Text style={{ color: colors.textDim }} size="xs" weight="semiBold">
							{points} PX
						</Text>
						{isCompleted === 1 && <CourseCompleteBadge />}
					</View>
				</View>

				{isCompleted === 1 ? (
					<IconSax icon={TickCircle} color={colors.success} />
				) : (
					<IconSax icon={Play} color={colors.tint} />
				)}
			</View>
		</Link>
	);
};

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
