import { ViewTransition } from "@/components/extras";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { LessonsTable } from "@/components/lessons/LessonsTable";
import { Page } from "@/components/page";
import { DataTable } from "@/components/lessons/DataTable";
import { zodValidator } from "@tanstack/zod-adapter";
import { pageSearchSchema } from "@/schema/page";
import { getLessonsOpts } from "@/hooks/api/lesson";
import { AddButtonLink } from "@/components/form/button/AddButton";
import { ResourceProvider } from "@/context/resource.context";

export const Route = createFileRoute("/dashboard/lessons/")({
	component: RouteComponent,
	validateSearch: zodValidator(pageSearchSchema),
	loaderDeps: ({ search: { query } }) => ({ query }),
	loader: ({ context, deps }) =>
		context.queryClient.ensureInfiniteQueryData(
			getLessonsOpts({ query: deps.query }),
		),
});

function RouteComponent() {
	return (
		<ResourceProvider value={{ resource: "Lesson" }}>
			<Page>
				<Page.Header>
					<Page.Title title="Lessons" />
					<AddButtonLink to="/dashboard/lessons/add" />
				</Page.Header>
				<Page.Content>
					<ViewTransition>
						<Suspense fallback={<DataTable.Loading />}>
							<LessonsTable />
						</Suspense>
					</ViewTransition>
				</Page.Content>
			</Page>
		</ResourceProvider>
	);
}
