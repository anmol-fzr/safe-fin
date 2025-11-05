import {
	adminClient,
	anonymousClient,
	inferAdditionalFields,
	multiSessionClient,
	phoneNumberClient,
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
			anonymousClient(),
			phoneNumberClient(),
			adminClient(),
			multiSessionClient(),
			inferAdditionalFields<typeof auth>(),
		],
	});
};

export { createAdminAuthClient };
