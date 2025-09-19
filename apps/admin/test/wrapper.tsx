import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createRootRoute,
	createRouter,
	Outlet,
	Route,
	RouterProvider,
} from "@tanstack/react-router";
import type { PropsWithChildren } from "react";

const rootRoute = createRootRoute();

const indexRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/",
	component: Outlet,
});

const router = createRouter({
	routeTree: rootRoute.addChildren([indexRoute]),
});

const Wrapper = ({ children }: PropsWithChildren) => {
	return <RouterProvider router={router}>{children}</RouterProvider>;
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

export const wrapper = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		<Wrapper>{children}</Wrapper>
	</QueryClientProvider>
);
