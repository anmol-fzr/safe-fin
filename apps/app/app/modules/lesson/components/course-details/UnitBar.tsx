import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/Text";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Unit } from "../../api-types/course_one";

type UnitProps = {
	unit: Unit;
};

export const UnitBar = (props: UnitProps) => {
	const { unit } = props;

	const { id, content, points } = unit;
	const { title, shortDesc, longDesc } = content;

	const {
		theme: { colors },
	} = useAppTheme();

	return (
		<Link
			href={{
				pathname: "/course/units/[unitId]",
				params: {
					unitId: id,
					title,
					shortDesc,
					content: longDesc.content,
				},
			}}
		>
			<View style={styles.cardContainer}>
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
				</View>

				<Text style={{ color: colors.textDim }} size="xs">
					{points} PX
				</Text>
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
