import {
	LegendList,
	type LegendListProps,
	type LegendListRef,
} from "@legendapp/list";
import type {
	ForwardedRef,
	PropsWithoutRef,
	ReactElement,
	ReactNode,
	RefObject,
} from "react";
import { forwardRef, memo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/Text";
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
		<View style={listMessageStyles.root}>
			<Text preset="subheading">{icon}</Text>
			<Text preset="subheading">{title}</Text>
			<Text style={listMessageStyles.desc}>{desc}</Text>
		</View>
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

export const BaseListItemSeparator = memo(() => (
	<View style={{ height: 8, width: 8 }} />
));
