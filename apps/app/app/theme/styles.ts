import type { ViewStyle } from "react-native";
import { spacing } from "./spacing";

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
	row: { flexDirection: "row" } as ViewStyle,
	flex1: { flex: 1 } as ViewStyle,

	flexWrap: { flexWrap: "wrap" } as ViewStyle,

	container: {
		paddingTop: spacing.xs,
		paddingBottom: spacing.xxl,
		paddingHorizontal: spacing.xs,
	} as ViewStyle,

	lowHeaderScreen: {
		padding: spacing.xs,
		//paddingBottom: spacing.bottom,
	} as ViewStyle,

	fullHeaderScreen: {
		gap: spacing.md,
		padding: spacing.xs,
		//paddingBottom: spacing.xxl,
	} as ViewStyle,

	goBack: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	} as ViewStyle,

	toggleInner: {
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
	} as ViewStyle,
};
