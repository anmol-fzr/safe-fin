import { Page } from "@/components/page";
import { KeyShortcuts } from "@/components/settings/KeyShortcuts";
import { useSidebar } from "@/components/ui/sidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/settings")({
	beforeLoad: ({ location: { pathname } }) => {
		if (
			pathname === "/dashboard/settings" ||
			pathname === "/dashboard/settings/"
		) {
			throw redirect({
				to: "/dashboard/settings/application",
			});
		}
	},
	component: RouteComponent,
	loader: () => ({
		crumb: "Settings",
	}),
});

function RouteComponent() {
	const sidebar = useSidebar();

	useEffect(() => {
		sidebar.setOpen(false);
	}, []);

	const navigate = Route.useNavigate();

	const handleTabChange = (to: string) => navigate({ to });

	return (
		<Page className="max-w-screen-xl mx-auto">
			<Page.Header>
				<div className="ml-96">
					<Tabs defaultValue="account" onValueChange={handleTabChange}>
						<TabsList>
							<TabsTrigger value="account">Account</TabsTrigger>
							<TabsTrigger value="customization">Customization</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
			</Page.Header>

			<Page.Content className="flex-row">
				<KeyShortcuts className="h-fit w-96" />
				<div className="max-w-screen-md">
					<Outlet />
				</div>
			</Page.Content>
		</Page>
	);
}
