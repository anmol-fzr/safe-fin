import { ViewTransition } from "@/components/extras";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { LessonsTable } from "@/components/lessons/LessonsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Page } from "@/components/page";
import { Kbd } from "@/components/ui/kbd";
import { DataTable } from "@/components/lessons/DataTable";
import { zodValidator } from "@tanstack/zod-adapter";
import { pageSearchSchema } from "@/schema/page";
import { getLessonsOpts } from "@/hooks/api/lesson";
import { useHotkeys } from "react-hotkeys-hook";
import { AddButton } from "@/components/form/button/AddButton";

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
	const navigate = Route.useNavigate();

	return (
		<Page>
			<Page.Header>
				<Page.Title title="Lessons" />
				<AddButton keyBind="a" to="/dashboard/lessons/new" resource="Lesson" />
			</Page.Header>
			<Page.Content>
				<ViewTransition>
					<Suspense fallback={<DataTable.Loading />}>
						<LessonsTable />
					</Suspense>
				</ViewTransition>
			</Page.Content>
		</Page>
	);
}
