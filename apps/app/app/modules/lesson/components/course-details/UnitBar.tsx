import { Link } from "expo-router";
import type { Unit } from "../../api-types/course_one";
import { usePrefetchUnit } from "../../hooks/units/queries";
import { ItemCard } from "../ItemCard";
import { Pressable, View } from "react-native";
import { useAppTheme } from "@/utils/useAppTheme";
import { Text } from "@/components";
import { toast } from "sonner-native";

type UnitProps = {
	unit: Unit;
	index: number;
};

export const UnitBar = (props: UnitProps) => {
	const { unit, index } = props;

	const { id, content, points, status } = unit;
	const { title } = content;

	const { prefetchUnit } = usePrefetchUnit();

	function handlePrefetchUnit() {
		prefetchUnit(id);
	}

	const {
		theme: { colors },
	} = useAppTheme();

	const isUnlocked = status === "UNLOCKED";

	const handleLockedPress = () => {
		toast.error("Locked !!", { richColors: false });
		//Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
	};
	console.info({ status });

	return status === "LOCKED" ? (
		<Pressable onPress={handleLockedPress}>
			<ItemCard {...{ title, points, status }} />
		</Pressable>
	) : (
		<Link
			onPressIn={handlePrefetchUnit}
			href={{
				pathname: "/course/units/[unitId]",
				params: {
					unitId: id,
				},
			}}
		>
			<View
				style={[
					{
						flex: 1,
						width: "100%",
					},
					isUnlocked
						? {
								borderWidth: 4,
								borderColor: colors.tint,
								position: "relative",
								borderRadius: 16,
								alignItems: "center",
								//paddingBlock: 8,
							}
						: undefined,
				]}
			>
				{isUnlocked && (
					<Text
						style={{
							position: "absolute",
							bottom: 0,
							//left: 0,
							zIndex: 2,
							color: colors.textInverse,
							backgroundColor: colors.tint,
							paddingInline: 12,
							paddingTop: 2,
							borderRadius: 1,
							borderTopLeftRadius: 12,
							borderTopRightRadius: 12,
						}}
						size="sm"
						weight="bold"
					>
						{index === 0 ? "Start " : "Continue "} here
					</Text>
				)}
				<ItemCard {...{ title, points, status }} />
			</View>
		</Link>
	);
};
