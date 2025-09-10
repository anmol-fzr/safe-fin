import { MissingContextError } from "@/lib/error";
import { use, type Context } from "react";

export const useSafeContext = <T>(
	context: Context<T>,
	hookName: string,
	contextName: string,
) => {
	const ctx = use(context);

	if (ctx === null || ctx === undefined) {
		throw new MissingContextError(hookName, contextName);
	}

	return ctx;
};
