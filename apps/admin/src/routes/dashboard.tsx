import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/dashboard")({
	// beforeLoad: async ({ navigate }) => {
	// 	const data = await authClient.getSession();
	// 	if (!data.session) {
	// 		navigate("/");
	// 	}
	// },
	component: Dashboard,
	loader: () => ({ crumb: "Dashboard" }),
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
