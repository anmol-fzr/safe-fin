import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { BackButton } from "@/components/form/button/BackButton";
import Loader from "@/components/loader";
import { Page } from "@/components/page";

const NewCourseForm = lazy(
	() => import("@/modules/courses/components/course-form/NewCourseForm"),
);

export const Route = createFileRoute("/dashboard/courses/add")({
	component: RouteComponent,
	loader: (ctx) => {
		return {
			crumb: `New ${ctx.context.label.single}`,
		};
	},
});

function RouteComponent() {
	const { label } = Route.useRouteContext();

	return (
		<div>
			<div className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/courses" resource={label.plural} />
				<Page.Title title={`Create New ${label.single}`} />
			</div>
			<div className="mx-auto max-h-screen">
				<Suspense fallback={<Loader />}>
					<NewCourseForm />
				</Suspense>
			</div>
		</div>
	);
}
