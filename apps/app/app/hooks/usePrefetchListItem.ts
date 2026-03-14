import type { OnViewableItemsChanged } from "@legendapp/list";
import type { QueryOptions } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import type { ResourceId } from "@/types";

type UsePrefetchListItemOpts<TQueryFnData> = {
	prefetchQueryFn: (id: ResourceId) => QueryOptions<TQueryFnData>;
};

export const usePrefetchListItem = <TQueryFnData extends { id: ResourceId }>(
	opts: UsePrefetchListItemOpts<TQueryFnData>,
) => {
	const { prefetchQueryFn } = opts;

	const seenIds = useRef(new Set<ResourceId>());

	const queryClient = useQueryClient();

	const prefetchResource = useCallback(
		(scamId: ResourceId) => {
			return queryClient.prefetchQuery(prefetchQueryFn(scamId));
		},
		[queryClient.prefetchQuery, prefetchQueryFn],
	);

	const handleViewableItemsChanged = useCallback<
		OnViewableItemsChanged<TQueryFnData>
	>(
		({ viewableItems }) => {
			viewableItems.forEach((item) => {
				const id = item.item.id;

				if (!seenIds.current.has(id)) {
					prefetchResource(id);
					seenIds.current.add(id);
				}
			});
		},
		[prefetchResource],
	);

	return handleViewableItemsChanged;
};
