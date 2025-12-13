import { useLocalSearchParams } from "expo-router";
import { ScamScreen } from "@/modules/scam/screens";
import { MissingRouteParamError } from "@/utils/error";

export default function Screen() {
	const params = useLocalSearchParams();
	if (!params.scamId) {
		throw new MissingRouteParamError("scamId", "ScamScreen");
	}

	const scamId = Number(params.scamId);

	if (!Number.isSafeInteger(scamId)) {
		throw new TypeError("scamId must be a Number");
	}

	return <ScamScreen scamId={scamId} />;
}
