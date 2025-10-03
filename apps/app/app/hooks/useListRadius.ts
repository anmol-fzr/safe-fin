import { useCallback, useMemo } from "react";
import { useAppTheme } from "@/utils/useAppTheme";

interface UseListRadiusOpts {
	mainRadiusMultiplier: number;
	sideRadiusMultiplier: number;
}

export const useListRadius = (props: UseListRadiusOpts) => {
	const { mainRadiusMultiplier, sideRadiusMultiplier } = props;
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
			borderBottomLeftRadius: borderRadius,
			borderTopLeftRadius: borderRadius,
			borderTopRightRadius: leanBorderRadius,
			borderBottomRightRadius: leanBorderRadius,
		}),
		[borderRadius, leanBorderRadius],
	);

	const lastStyles = useMemo(
		() => ({
			borderTopRightRadius: borderRadius,
			borderBottomRightRadius: borderRadius,
			borderTopLeftRadius: leanBorderRadius,
			borderBottomLeftRadius: leanBorderRadius,
		}),
		[borderRadius, leanBorderRadius],
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
