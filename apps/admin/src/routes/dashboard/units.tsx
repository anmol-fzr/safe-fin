import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/units")({
	component: Outlet,
	beforeLoad: () => {
		return {
			label: {
				single: "Unit",
				plural: "Units",
			},
		};
	},
	loader: ({ context }) => ({
		crumb: context.label.plural,
	}),
});
