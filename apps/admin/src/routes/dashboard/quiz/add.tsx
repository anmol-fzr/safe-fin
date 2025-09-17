import { createFileRoute } from "@tanstack/react-router";
import { BackButton } from "@/components/form/button/BackButton";
import { Page } from "@/components/page";
import { NewQuizForm } from "@/components/quiz/NewQuizForm";

export const Route = createFileRoute("/dashboard/quiz/add")({
	component: RouteComponent,
	loader: () => ({
		crumb: "New Quiz",
	}),
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
