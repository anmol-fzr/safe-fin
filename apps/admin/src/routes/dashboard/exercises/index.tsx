import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense } from "react";
import { ViewTransition } from "@/components/extras";
import { AddButtonLink } from "@/components/form/button/AddButton";
import { Page } from "@/components/page/Page";
import { DataTable } from "@/components/table/DataTable";
import { ResourceProvider } from "@/context/resource.context";
import { pageSearchSchema } from "@/schema/page";
import { getExercisesOpts } from "@/modules/exercise/hooks/queries";
import { ExerciseTable } from "@/modules/exercise/components/exercise-table/ExerciseTable";

export const Route = createFileRoute("/dashboard/exercises/")({
	component: RouteComponent,
	validateSearch: zodValidator(pageSearchSchema),
	loaderDeps: ({ search: { query } }) => ({ query }),
	loader: ({ context, deps }) => {
		context.queryClient.prefetchInfiniteQuery(
			getExercisesOpts({ search: deps.query }),
		);
	},
});

function RouteComponent() {
	const { label } = Route.useRouteContext();

	return (
		<ResourceProvider value={{ resource: label.single }}>
			<Page>
				<Page.Header>
					<Page.Title title={label.plural} />
					<AddButtonLink to="/dashboard/exercises/add" />
				</Page.Header>
				<Page.Content>
					<ViewTransition>
						<Suspense fallback={<DataTable.Loading columns={6} />}>
							<ExerciseTable />
						</Suspense>
					</ViewTransition>
				</Page.Content>
			</Page>
		</ResourceProvider>
	);
}
