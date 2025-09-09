import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/quiz")({
	component: Outlet,
	loader: () => ({
		crumb: "Quizzes",
	}),
});
