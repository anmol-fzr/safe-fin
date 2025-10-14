import { queryOptions, useQuery } from "@tanstack/react-query";
import { DEMO_GRAPHICS } from "../api";

const getDemoGraphicsOpts = () => {
	return queryOptions({
		queryKey: ["USER", "PROFILE", "DEMO_GRAPHICS"],
		queryFn: DEMO_GRAPHICS.GET,
	});
};

const useGetDemoGraphics = () => {
	const opts = getDemoGraphicsOpts();
	return useQuery(opts);
};

export { getDemoGraphicsOpts };
export { useGetDemoGraphics };
