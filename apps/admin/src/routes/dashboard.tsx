import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import Loader from "@/components/loader";
import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
	beforeLoad: async () => {
		const session = await authClient.getSession();
		if (session.data === null) {
			throw redirect({ to: "/" });
		}
	},
	component: Dashboard,
	loader: () => ({ crumb: "Dashboard" }),
	pendingComponent: Loader,
});

function Dashboard() {
	return (
		<div className="grid grid-rows-[auto_1fr] h-svh">
			<div className="[--header-height:calc(--spacing(14))]">
				<SidebarProvider className="flex flex-col">
					<SiteHeader />
					<div className="flex flex-1">
						<AppSidebar />
						<SidebarInset>
							<div className="p-4">
								<Outlet />
							</div>
						</SidebarInset>
					</div>
				</SidebarProvider>
			</div>
		</div>
	);
}
