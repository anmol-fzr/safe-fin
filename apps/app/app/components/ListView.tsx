import {
	LegendList,
	type LegendListProps,
	type LegendListRef,
} from "@legendapp/list/react-native";
import type {
	ForwardedRef,
	PropsWithoutRef,
	ReactElement,
	ReactNode,
	RefObject,
} from "react";
import { forwardRef, memo } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, {
	BounceIn,
	FadeIn,
	FadeInDown,
} from "react-native-reanimated";
import { Text } from "@/components/Text";
import { makeSpringy, type ThemedViewStyle } from "@/theme";
import { getGenericEmptyState } from "@/utils/faker/emptyState";
import { getGenericEndState } from "@/utils/faker/endState";

export type ListViewRef = LegendListRef;

export type ListViewProps<T> = PropsWithoutRef<LegendListProps<T>>;

const ListViewComponent = forwardRef(
	<T,>(props: ListViewProps<T>, ref: ForwardedRef<LegendListRef>) => {
		return <LegendList {...props} ref={ref} />;
	},
);

ListViewComponent.displayName = "ListView";

export const ListView = ListViewComponent as <T>(
	props: ListViewProps<T> & {
		ref?: RefObject<LegendListRef>;
	},
) => ReactElement;

interface ListMessageViewProps {
	icon: ReactNode;
	title: string;
	desc: string;
}

const ListMessageView = (props: ListMessageViewProps) => {
	const { icon, title, desc } = props;

	return (
		<Animated.View
			style={listMessageStyles.root}
			entering={makeSpringy(FadeIn)}
		>
			<Text entering={makeSpringy(BounceIn)} preset="subheading">
				{icon}
			</Text>
			<Text entering={FadeInDown} preset="subheading">
				{title}
			</Text>
			<Text entering={FadeInDown} style={listMessageStyles.desc}>
				{desc}
			</Text>
		</Animated.View>
	);
};
const listMessageStyles = StyleSheet.create({
	root: { alignItems: "center", gap: 8, paddingBlock: 32 },
	desc: { textAlign: "center", paddingInline: 16 },
});

export const EmptyListView = () => {
	const { emoji, title, subtitle } = getGenericEmptyState();
	return <ListMessageView icon={emoji} title={title} desc={subtitle} />;
};

export const EndListView = () => {
	const { emoji, title, subtitle } = getGenericEndState();
	return <ListMessageView icon={emoji} title={title} desc={subtitle} />;
};

export const BaseListItemSeparator = memo((props?: ViewProps) => (
	<View style={{ height: 8, width: 8 }} {...props} />
));

export const $baseListItemSeparatorStyles: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.xs,
});

export const $mdListItemSeparatorStyles: ThemedViewStyle = (theme) => ({
	gap: theme.spacing.md,
});
