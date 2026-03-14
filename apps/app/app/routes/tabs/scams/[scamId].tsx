import { z } from "zod";
import { createRoute } from "@/factory/route";
import { ScamScreen } from "@/modules/scam/screens";
import { idSchema } from "@/schema";

const { useParams } = createRoute({
	paramSchema: z.object({
		scamId: idSchema,
	}),
});

export default function Screen() {
	const { scamId } = useParams();

	return <ScamScreen scamId={scamId} />;
}
