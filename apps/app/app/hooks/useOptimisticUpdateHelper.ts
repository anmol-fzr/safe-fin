import {
	type InferDataFromTag,
	type NoInfer,
	type QueryKey,
	type Updater,
	useQueryClient,
} from "@tanstack/react-query";

export const useOptimisticUpdateHelper = () => {
	const client = useQueryClient();

	function getCacheOperator<
		TQueryFnData = unknown,
		TTaggedQueryKey extends QueryKey = QueryKey,
		TInferredQueryFnData = InferDataFromTag<TQueryFnData, TTaggedQueryKey>,
	>(queryKey: TTaggedQueryKey) {
		return {
			get: (): TInferredQueryFnData | undefined => {
				return client.getQueryData(queryKey);
			},

			set: (
				updater: Updater<
					NoInfer<TInferredQueryFnData> | undefined,
					NoInfer<TInferredQueryFnData> | undefined
				>,
			) => {
				return client.setQueryData(queryKey, updater);
			},
		};
	}

	return {
		getCacheOperator,
	};
};

// getQueryData<TQueryFnData = unknown, TTaggedQueryKey extends QueryKey = QueryKey, TInferredQueryFnData = InferDataFromTag<TQueryFnData, TTaggedQueryKey>>(queryKey: TTaggedQueryKey): TInferredQueryFnData | undefined;
// setQueryData<TQueryFnData = unknown, TTaggedQueryKey extends QueryKey = QueryKey, TInferredQueryFnData = InferDataFromTag<TQueryFnData, TTaggedQueryKey>>(queryKey: TTaggedQueryKey, updater: Updater<NoInfer<TInferredQueryFnData> | undefined, NoInfer<TInferredQueryFnData> | undefined>, options?: SetDataOptions): NoInfer<TInferredQueryFnData> | undefined;
