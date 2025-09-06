import { hcWithType } from "@safe-fin/server/hc";

export const getApiClient = (uri: string) =>
	hcWithType(uri, {
		init: {
			credentials: "include",
		},
	});
