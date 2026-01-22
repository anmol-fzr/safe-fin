import { useLocalSearchParams } from "expo-router";
import type { z } from "zod";

class SearchParamValidationError extends Error {}

export const useTypedLocalSearchParams = <T>(schema: z.ZodObject<T>) => {
	const params = useLocalSearchParams();

	const result = schema.safeParse(params);

	if (!result.success) {
		const error = new SearchParamValidationError(
			"Search Params Validation Failed",
		);
		console.error(error);
		throw error;
	}

	return result.data;
};
