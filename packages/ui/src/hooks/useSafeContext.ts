import type React from "react";
import { use } from "react";

class MissingContextError extends Error {
	constructor(hookName: string, providerName: string) {
		const err = `${hookName} must be used within a ${providerName}`;
		super(err);
	}
}

const useSafeContext = <T>(
	context: React.Context<T | null> | React.Context<T>,
	hookName: string,
	contextComponentName?: string,
) => {
	const ctx = use(context);

	if (ctx === null || ctx === undefined) {
		throw new MissingContextError(
			hookName,
			context.displayName ?? contextComponentName ?? "<Context.Provider>",
		);
	}
	return ctx as T;
};

const createSafeContextHook = <T>(
	context: React.Context<T | null>,
	hookName: string,
	contextComponentName?: string,
) => {
	return () => useSafeContext(context, hookName, contextComponentName);
};

export { useSafeContext, createSafeContextHook };
