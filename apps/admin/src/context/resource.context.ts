import { createContext } from "react";
import { useSafeContext } from "./helper";

type ResourceContext = {
	resource: string;
};

const resourceContext = createContext<ResourceContext | null>(null);

const ResourceProvider = resourceContext.Provider;

const useResource = () => {
	return useSafeContext(resourceContext, "useResource", "ResourceProvider");
};

export { ResourceProvider, useResource };
