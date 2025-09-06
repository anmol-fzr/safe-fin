import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/lessons")({
	component: Outlet,
	loader: () => ({
		crumb: "Lessons",
	}),
});
