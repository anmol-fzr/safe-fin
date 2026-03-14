import { expoClient } from "@better-auth/expo/client";
import {
	emailOTPClient,
	//anonymousClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { ServerAuth } from "./server";

interface CreateAppAuthClientOpts {
	baseURL: string;
	storage: {
		setItem: (key: string, value: string) => unknown;
		getItem: (key: string) => string | null;
	};
}

const createAppAuthClient = (opts: CreateAppAuthClientOpts) => {
	const { baseURL, storage } = opts;

	return createAuthClient({
		baseURL,
		plugins: [
			expoClient({
				scheme: "safefin",
				storagePrefix: "safefin",
				storage,
			}),
			emailOTPClient(),
			inferAdditionalFields<ServerAuth>(),
			//anonymousClient(),
		],
	});
};

export { createAppAuthClient };
