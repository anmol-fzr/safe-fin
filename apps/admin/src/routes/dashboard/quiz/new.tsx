import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/quiz/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/dashboard/quiz/new"!</div>;
}
