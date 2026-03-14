import { useLocalSearchParams } from "expo-router";
import type { z } from "zod";

class SearchParamValidationError extends Error {}

export const useTypedLocalSearchParams = (schema: z.ZodTypeAny) => {
	const params = useLocalSearchParams();

	const result = schema.safeParse(params);

	if (!result.success) {
		const error = new SearchParamValidationError(
			"Search Params Validation Failed",
		);
		console.error(result.error.message);
		console.error(error);
		throw error;
	}

	return result.data;
};
