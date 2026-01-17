import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/courses")({
	component: Outlet,
	beforeLoad: () => {
		return {
			label: {
				single: "Course",
				plural: "Courses",
			},
		};
	},
	loader: ({ context }) => ({
		crumb: context.label.plural,
	}),
});
