import { useCallback, useMemo } from "react";
import { useAppTheme } from "@/utils/useAppTheme";

export const useListRadius = ({
	mainRadiusMultiplier = 1.2,
	sideRadiusMultiplier = 0.2,
	horizontal = false,
}) => {
	const {
		theme: { roundness },
	} = useAppTheme();

	const borderRadius = useMemo(
		() => roundness * mainRadiusMultiplier,
		[mainRadiusMultiplier, roundness],
	);

	const leanBorderRadius = useMemo(
		() => roundness * sideRadiusMultiplier,
		[sideRadiusMultiplier, roundness],
	);

	const firstStyles = useMemo(
		() => ({
			borderTopLeftRadius: borderRadius,
			borderTopRightRadius: horizontal ? leanBorderRadius : borderRadius,
			borderBottomLeftRadius: horizontal ? borderRadius : leanBorderRadius,
			borderBottomRightRadius: leanBorderRadius,
		}),
		[borderRadius, leanBorderRadius, horizontal],
	);

	const lastStyles = useMemo(
		() => ({
			borderTopLeftRadius: leanBorderRadius,
			borderTopRightRadius: horizontal ? borderRadius : leanBorderRadius,
			borderBottomLeftRadius: horizontal ? leanBorderRadius : borderRadius,
			borderBottomRightRadius: borderRadius,
		}),
		[borderRadius, leanBorderRadius, horizontal],
	);

	const normalStyles = useMemo(
		() => ({
			borderRadius: leanBorderRadius,
		}),
		[leanBorderRadius],
	);

	const getStyles = useCallback(
		({ isFirst = false, isLast = false }) => {
			return isFirst ? firstStyles : isLast ? lastStyles : normalStyles;
		},
		[firstStyles, lastStyles, normalStyles],
	);

	return {
		firstStyles,
		lastStyles,
		normalStyles,
		getStyles,
	};
};
