import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense } from "react";
import { ViewTransition } from "@/components/extras";
import { AddButtonLink } from "@/components/form/button/AddButton";
import { Page } from "@/components/page";
import { DataTable } from "@/components/table/DataTable";
import { ResourceProvider } from "@/context/resource.context";
import { CoursesTable } from "@/modules/courses/components/courses-table/CoursesTable";
import { getCoursesOpts } from "@/modules/courses/hooks/queries";
import { pageSearchSchema } from "@/schema/page";

export const Route = createFileRoute("/dashboard/courses/")({
	component: RouteComponent,
	validateSearch: zodValidator(pageSearchSchema),
	loaderDeps: ({ search: { query } }) => ({ query }),
	loader: ({ context, deps }) => {
		return context.queryClient.ensureInfiniteQueryData(
			getCoursesOpts(),
			//getCoursesOpts({ query: deps.query }),
		);
	},
});

const title = "Courses";
function RouteComponent() {
	return (
		<ResourceProvider value={{ resource: title }}>
			<Page>
				<Page.Header>
					<Page.Title title={title} />
					<AddButtonLink to="/dashboard/courses/add" />
				</Page.Header>
				<Page.Content>
					<ViewTransition>
						<Suspense fallback={<DataTable.Loading />}>
							<CoursesTable />
						</Suspense>
					</ViewTransition>
				</Page.Content>
			</Page>
		</ResourceProvider>
	);
}
