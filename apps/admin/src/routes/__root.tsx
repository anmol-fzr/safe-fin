import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/react-router";
import "../index.css";
import type { QueryClient } from "@tanstack/react-query";
import { Providers } from "@/components/providers";

export interface RouterAppContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "SafeFin Admin Panel",
			},
			{
				name: "description",
				content: "SafeFin Admin Panel",
			},
		],
		// links: [
		// 	{
		// 		rel: "icon",
		// 		href: "/favicon.ico",
		// 	},
		// ],
	}),
});

function RootComponent() {
	// const isFetching = useRouterState({
	// 	select: (s) => s.isLoading,
	// });

	return (
		<>
			<HeadContent />
			<Providers>
				<Outlet />
			</Providers>
		</>
	);
}
