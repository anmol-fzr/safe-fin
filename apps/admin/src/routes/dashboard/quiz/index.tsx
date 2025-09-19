import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { Suspense } from "react";
import { ViewTransition } from "@/components/extras";
import { AddButtonLink } from "@/components/form/button/AddButton";
import { Page } from "@/components/page/Page";
import { QuizTable } from "@/components/quiz/QuizTable";
import { DataTable } from "@/components/table/DataTable";
import { ResourceProvider } from "@/context/resource.context";
import { getQuizzesOpts } from "@/hooks/api/quiz";
import { pageSearchSchema } from "@/schema/page";

export const Route = createFileRoute("/dashboard/quiz/")({
	component: RouteComponent,
	validateSearch: zodValidator(pageSearchSchema),
	loaderDeps: ({ search: { query } }) => ({ query }),
	loader: ({ context, deps }) => {
		context.queryClient.prefetchInfiniteQuery(
			getQuizzesOpts({ query: deps.query }),
		);
	},
});

function RouteComponent() {
	return (
		<ResourceProvider value={{ resource: "Quiz" }}>
			<Page>
				<Page.Header>
					<Page.Title title="Quizzes" />
					<AddButtonLink to="/dashboard/quiz/add" />
				</Page.Header>
				<Page.Content>
					<ViewTransition>
						<Suspense fallback={<DataTable.Loading columns={6} />}>
							<QuizTable />
						</Suspense>
					</ViewTransition>
				</Page.Content>
			</Page>
		</ResourceProvider>
	);
}
