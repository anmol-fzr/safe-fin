import { useLocalSearchParams } from "expo-router";
import type { z } from "zod";
import { Screen, type ScreenProps } from "@/components";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { $styles } from "@/theme";

interface CreateRouteOptions<TSchema extends z.ZodTypeAny | undefined> {
	paramSchema?: TSchema;
}

export function createRoute<
	TSchema extends z.ZodTypeAny | undefined = undefined,
>(opts?: CreateRouteOptions<TSchema>) {
	const { paramSchema } = opts ?? {};

	type Params = TSchema extends z.ZodTypeAny
		? z.infer<TSchema>
		: ReturnType<typeof useLocalSearchParams>;

	function useParams(): Params {
		if (paramSchema) {
			return useTypedLocalSearchParams(paramSchema) as Params;
		}

		return useLocalSearchParams() as Params;
	}

	function RouteScreen(props: ScreenProps) {
		return (
			<Screen
				preset="scroll"
				contentContainerStyle={[$styles.fullHeaderScreen, { flex: 1 }]}
				safeAreaEdges={["bottom"]}
				{...props}
			/>
		);
	}

	return {
		Screen: RouteScreen,
		useParams,
	};
}
