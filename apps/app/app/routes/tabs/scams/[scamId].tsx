import { ScamScreen } from "@/modules/scam/screens";
import { idSchema } from "@/schema";
import { useTypedLocalSearchParams } from "@/hooks/navigation/useTypedLocalSearchParams";
import { z } from "zod";

const paramsSchema = z.object({
	scamId: idSchema,
});

export default function Screen() {
	const params = useTypedLocalSearchParams(paramsSchema);
	const { scamId } = params;

	return <ScamScreen scamId={scamId} />;
}
