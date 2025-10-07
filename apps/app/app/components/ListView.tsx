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
