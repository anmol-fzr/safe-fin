import {
	adminClient,
	emailOTPClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./server";

interface CreateAdminAuthClientOpts {
	baseURL: string;
}

const createAdminAuthClient = (opts: CreateAdminAuthClientOpts) => {
	const { baseURL } = opts;

	return createAuthClient({
		baseURL,
		plugins: [
			emailOTPClient(),
			adminClient(),
			inferAdditionalFields<typeof auth>(),
		],
	});
};

export { createAdminAuthClient };
