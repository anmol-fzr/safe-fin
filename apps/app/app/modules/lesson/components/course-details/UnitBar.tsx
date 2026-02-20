import { isUndefined } from "@safe-fin/utils";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { useRef } from "react";
import { Pressable, View } from "react-native";
import { toast } from "sonner-native";
import { Text } from "@/components";
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

	const handleLockedPress = () => {
		const message = getRandomLockedUnitMessage();
		toast.error(message);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
	};

	if (status === "LOCKED") {
		return (
			<Pressable onPress={handleLockedPress}>
				<ItemCard {...{ title, points, status }} />
			</Pressable>
		);
	}

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
			<RadiantButton
				// theme={{
				// 	background: colors.palette.neutral100,
				// 	backgroundSubtle: colors.tint,
				// 	highlight: colors.tint,
				// }}
				paddingHorizontal={4}
				paddingVertical={4}
			>
				<ItemCard
					{...{ title, points, status }}
					style={{ borderWidth: 0, backgroundColor: "transparent" }}
				/>
			</RadiantButton>
		</Link>
	);
};
