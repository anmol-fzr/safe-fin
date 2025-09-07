import { useEffect } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { useSession } from "@/hooks/api/auth";
import Loader from "@/components/loader";

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
	loader: () => ({ crumb: "Dashboard" }),
});

function Dashboard() {
	const { isPending, session } = useSession();
	const navigate = Route.useNavigate();

	useEffect(() => {
		if (session === undefined) {
			//navigate({ to: "/" });
		}
	}, [isPending]);

	if (isPending) {
		return <Loader />;
	}

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
