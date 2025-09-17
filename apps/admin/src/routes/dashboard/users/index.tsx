import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense } from "react";
import { ViewTransition } from "@/components/extras";
import { Page } from "@/components/page";
import { DataTable } from "@/components/table/DataTable";
import { AddUserDrawer } from "@/components/users/AddUserDrawer";
import { UsersTable } from "@/components/users/UsersTable";
import { ResourceProvider } from "@/context/resource.context";
import { getUsersOpts } from "@/hooks/api/user";
import { usersPageSearchSchema } from "@/schema/page";

export const Route = createFileRoute("/dashboard/users/")({
	validateSearch: zodValidator(usersPageSearchSchema),
	loaderDeps: ({ search: { name } }) => ({ name }),
	loader: ({ context, deps }) => {
		context.queryClient.prefetchInfiniteQuery(getUsersOpts(deps));
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<ResourceProvider value={{ resource: "User" }}>
			<Page>
				<Page.Header>
					<Page.Title title="Users" />
					<AddUserDrawer />
				</Page.Header>
				<Page.Content>
					<ViewTransition>
						<Suspense fallback={<DataTable.Loading columns={12} />}>
							<UsersTable />
						</Suspense>
					</ViewTransition>
				</Page.Content>
			</Page>
		</ResourceProvider>
	);
}
