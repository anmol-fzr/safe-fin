import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { BackButton } from "@/components/form/button/BackButton";
import Loader from "@/components/loader";
import { Page } from "@/components/page";

const NewLessonForm = lazy(() => import("@/components/lessons/NewLessonForm"));

export const Route = createFileRoute("/dashboard/lessons/add")({
	component: RouteComponent,
	loader: () => ({
		crumb: "New Lesson",
	}),
});

function RouteComponent() {
	return (
		<div>
			<div className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/lessons" resource="Lessons" />
				<Page.Title title="Create New Lesson" />
			</div>
			<div className="mx-auto">
				<Suspense fallback={<Loader />}>
					<NewLessonForm />
				</Suspense>
			</div>
		</div>
	);
}
