import {
	TrueSheet,
	type TrueSheetProps,
} from "@lodev09/react-native-true-sheet";
import { forwardRef, useCallback } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import type { ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

interface BottomSheetProps extends TrueSheetProps {
	contentContainerStyle?: ViewStyle;
}

export const createBottomSheet = (SHEET_NAME: string) => {
	const useSheet = () => {
		const present = useCallback(() => {
			TrueSheet.present(SHEET_NAME);
		}, [SHEET_NAME]);

		const dismiss = useCallback(() => {
			TrueSheet.dismiss(SHEET_NAME);
		}, [SHEET_NAME]);

		return { present, dismiss };
	};

	const Sheet = (props: BottomSheetProps) => {
		return <BottomSheet {...props} name={SHEET_NAME} />;
	};

	return {
		Sheet,
		useSheet,
	};
};

export const BottomSheet = forwardRef<TrueSheet, BottomSheetProps>(
	(props, ref) => {
		const {
			themed,
			theme: { colors },
		} = useAppTheme();

		const {
			detents = ["auto", 1],
			grabberOptions = { color: colors.palette.neutral900 },
			backgroundColor = colors.background,
			contentContainerStyle,
			children,
			...rest
		} = props;

		return (
			<TrueSheet
				ref={ref}
				{...{ detents, grabberOptions, backgroundColor }}
				{...rest}
			>
				<View style={[themed($root), contentContainerStyle]}>{children}</View>
			</TrueSheet>
		);
	},
);

const $root: ThemedViewStyle = (theme) => ({
	padding: theme.spacing.md,
	paddingTop: theme.spacing.xl,
	gap: theme.spacing.md,
});
