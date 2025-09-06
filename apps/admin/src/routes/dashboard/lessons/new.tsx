import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { LessonForm } from "@/components/lessons/LessonForm";
import { BackButton } from "@/components/form/button/BackButton";

export const Route = createFileRoute("/dashboard/lessons/new")({
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
				<LessonForm />
			</div>
		</div>
	);
}
