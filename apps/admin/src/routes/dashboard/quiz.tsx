import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/quiz")({
	component: Outlet,
	beforeLoad: () => {
		return {
			label: {
				single: "Exercise",
				plural: "Exercises",
			},
		};
	},
	loader: ({ context }) => ({
		crumb: context.label.plural,
	}),
});
