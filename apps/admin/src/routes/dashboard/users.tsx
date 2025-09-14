import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { ViewTransition } from "@/components/extras";
import { Suspense } from "react";
import { DataTable } from "@/components/lessons/DataTable";
import { UsersTable } from "@/components/users/UsersTable";

export const Route = createFileRoute("/dashboard/users")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Page>
			<Page.Header>
				<Page.Title title="Users" />
			</Page.Header>
			<Page.Content>
				<ViewTransition>
					<Suspense fallback={<DataTable.Loading columns={11} />}>
						<UsersTable />
					</Suspense>
				</ViewTransition>
			</Page.Content>
		</Page>
	);
}
