import { BackButton } from "@/components/form/button/BackButton";
import { Page } from "@/components/page";
import { NewQuizForm } from "@/components/quiz/NewQuizForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/quiz/new")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/quiz" resource="Quizzes" />
				<Page.Title title="Create New Quiz" />
			</div>
			<div className="mx-auto">
				<NewQuizForm />
			</div>
		</div>
	);
}
