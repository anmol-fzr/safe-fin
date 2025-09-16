import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { ViewTransition } from "@/components/extras";
import { Suspense } from "react";
import { DataTable } from "@/components/lessons/DataTable";
import { UsersTable } from "@/components/users/UsersTable";
import { ResourceProvider } from "@/context/resource.context";
import { AddUserDrawer } from "@/components/users/AddUserDrawer";
import { getUsersOpts } from "@/hooks/api/user";
import { zodValidator } from "@tanstack/zod-adapter";
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
						<Suspense fallback={<DataTable.Loading columns={11} />}>
							<UsersTable />
						</Suspense>
					</ViewTransition>
				</Page.Content>
			</Page>
		</ResourceProvider>
	);
}
