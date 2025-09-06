import { createContext, useContext } from "react";
import { useSet } from "@/hooks";
import { MissingContextError } from "@/utils/error";

type ScamListContext = ReturnType<typeof useSet<string>>;
const scamListContext = createContext<ScamListContext | null>(null);

const useScamList = () => {
	const ctx = useContext(scamListContext);
	if (ctx === null || ctx === undefined) {
		throw new MissingContextError("useScamList", "ScamListProvider");
	}
	return ctx;
};

const ScamListProvider = scamListContext.Provider;

export { ScamListProvider, useScamList };
