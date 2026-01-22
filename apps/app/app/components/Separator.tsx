import type { Component } from "react";
import { View, type ViewProps } from "react-native";
import type { ThemedViewStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";

type Orientation = "horizontal" | "vertical";

interface SeparatorProps extends ViewProps {
	orientation?: Orientation;
}

const HorizontalSeparator = (props: ViewProps) => {
	const { style, ...rest } = props;

	const { themed } = useAppTheme();

	return <View style={[themed($horizontalSeparator), style]} {...rest} />;
};

const VerticalSeparator = (props: ViewProps) => {
	const { style, ...rest } = props;

	const { themed } = useAppTheme();

	return <View style={[themed($verticalSeparator), style]} {...rest} />;
};

const $horizontalSeparator: ThemedViewStyle = (theme) => ({
	backgroundColor: theme.colors.border,
	height: 1,
	width: "100%",
	marginTop: 12,
	marginBottom: 12,
});

const $verticalSeparator: ThemedViewStyle = (theme) => ({
	backgroundColor: theme.colors.border,
	height: "100%",
	width: 1,
	marginBottom: 12,
});

const compMap: Record<Orientation, typeof VerticalSeparator> = {
	vertical: VerticalSeparator,
	horizontal: HorizontalSeparator,
};

export function Separator(props: SeparatorProps) {
	const { orientation = "horizontal", ...rest } = props;

	const Comp = compMap[orientation];

	return <Comp {...rest} />;
}
