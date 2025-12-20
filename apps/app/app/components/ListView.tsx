import {
	LegendList,
	type LegendListProps,
	type LegendListRef,
} from "@legendapp/list";
import type {
	ForwardedRef,
	PropsWithoutRef,
	ReactElement,
	RefObject,
} from "react";
import { forwardRef } from "react";
import { View } from "react-native";
import { Text } from "@/components/Text";
import { getGenericEmptyState } from "@/utils/faker/emptyState";

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

export const EmptyListView = () => {
	const { emoji, title, subtitle } = getGenericEmptyState();
	return (
		<View style={{ alignItems: "center", gap: 8, paddingBlock: 48 }}>
			<Text preset="subheading">{emoji}</Text>
			<Text preset="subheading">{title}</Text>
			<Text>{subtitle}</Text>
		</View>
	);
};
