import type React from "react";
import { useContext } from "react";

class MissingContextError extends Error {
	constructor(hookName: string, providerName: string) {
		const err = `${hookName} must be used within a ${providerName}`;
		super(err);
	}
}

export const useSafeContext = <T>(
	context: React.Context<T | null>,
	hookName: string,
) => {
	const ctx = useContext(context);

	if (ctx === null || ctx === undefined) {
		throw new MissingContextError(
			hookName,
			context.displayName ?? "<Context.Provider>",
		);
	}
	return ctx as T;
};
