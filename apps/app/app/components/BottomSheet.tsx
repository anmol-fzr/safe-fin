import {
	TrueSheet,
	type TrueSheetProps,
} from "@lodev09/react-native-true-sheet";
import { forwardRef, useCallback } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import type { ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

interface BottomSheetProps extends TrueSheetProps {
	withOutContainer?: boolean;
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
			detents = ["auto"],
			grabberOptions = styles.grabber,
			contentContainerStyle,
			children,
			withOutContainer = false,
			...rest
		} = props;

		const { themed } = useAppTheme();

		if (withOutContainer) {
			return (
				<TrueSheet ref={ref} {...{ detents, grabberOptions }} {...rest}>
					{children}
				</TrueSheet>
			);
		}

		return (
			<TrueSheet ref={ref} {...{ detents, grabberOptions }} {...rest}>
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

const styles = StyleSheet.create({
	grabber: {
		color: "#000000",
	},
});
