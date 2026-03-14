import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { toast } from "sonner-native";
import RadiantButton from "@/components/shared/base/radiant-button";
import { getRandomLockedUnitMessage } from "@/utils/faker/course";
import { useAppTheme } from "@/utils/useAppTheme";
import type { Unit } from "../../api-types/course_one";
import { usePrefetchUnit } from "../../hooks/units/queries";
import { ItemCard } from "../ItemCard";

type UnitProps = {
	unit: Unit;
	index: number;
};

export const UnitBar = (props: UnitProps) => {
	const { unit } = props;

	const { id, content, points, status } = unit;
	const { title } = content;

	const { prefetchUnit } = usePrefetchUnit();

	function handlePrefetchUnit() {
		prefetchUnit(id);
	}

	const handleLockedPress = () => {
		const message = getRandomLockedUnitMessage();
		toast.error(message);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
	};

	if (status === "UNLOCKED") {
		return (
			<Link
				onPressIn={handlePrefetchUnit}
				href={{
					pathname: "/course/units/[unitId]",
					params: {
						unitId: id,
					},
				}}
				asChild
			>
				<RadiantButton paddingHorizontal={4} paddingVertical={4}>
					<ItemCard
						{...{ title, points, status }}
						style={{ borderWidth: 0, backgroundColor: "transparent" }}
					/>
				</RadiantButton>
			</Link>
		);
	}

	return (
		<Pressable onPress={handleLockedPress}>
			<ItemCard {...{ title, points, status }} />
		</Pressable>
	);

	if (status === "COMPLETED") {
		return (
			<Pressable onPress={handleLockedPress}>
				<ItemCard {...{ title, points, status }} />
			</Pressable>
		);
	}

	return (
		<Link
			onPressIn={handlePrefetchUnit}
			href={{
				pathname: "/course/units/[unitId]",
				params: {
					unitId: id,
				},
			}}
			asChild
		>
			<RadiantButton paddingHorizontal={4} paddingVertical={4}>
				<ItemCard
					{...{ title, points, status }}
					style={{ borderWidth: 0, backgroundColor: "transparent" }}
				/>
			</RadiantButton>
		</Link>
	);
};
