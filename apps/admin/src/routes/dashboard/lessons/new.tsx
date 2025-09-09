import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/page";
import { NewLessonForm } from "@/components/lessons/NewLessonForm";
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
				<NewLessonForm />
			</div>
		</div>
	);
}
