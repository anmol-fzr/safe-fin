import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/users")({
	component: Outlet,
	loader: () => ({
		crumb: "Users",
	}),
});
