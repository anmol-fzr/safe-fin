import { ViewTransition } from "@/components/extras";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { QuizTable } from "@/components/quiz/QuizTable";
import { DataTable } from "@/components/lessons/DataTable";
import { zodValidator } from "@tanstack/zod-adapter";
import { pageSearchSchema } from "@/schema/page";
import { getQuizzesOpts } from "@/hooks/api/quiz";
import { AddButtonLink } from "@/components/form/button/AddButton";
import { Page } from "@/components/page/Page";
import { ResourceProvider } from "@/context/resource.context";

export const Route = createFileRoute("/dashboard/quiz/")({
	component: RouteComponent,
	validateSearch: zodValidator(pageSearchSchema),
	loaderDeps: ({ search: { query } }) => ({ query }),
	loader: ({ context, deps }) => {
		context.queryClient.ensureInfiniteQueryData(
			getQuizzesOpts({ query: deps.query }),
		);
		return {
			crumb: "Quizzes",
		};
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
						<Suspense fallback={<DataTable.Loading />}>
							<QuizTable />
						</Suspense>
					</ViewTransition>
				</Page.Content>
			</Page>
		</ResourceProvider>
	);
}
