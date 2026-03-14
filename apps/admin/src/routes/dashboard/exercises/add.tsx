import {
	createFileRoute,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { BackButton } from "@/components/form/button/BackButton";
import { Page } from "@/components/page";
import {
	NewExerciseForm,
	useNewExerciseForm,
} from "@/modules/exercise/components/exercise-form/NewExerciseForm";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { useCreateExercise } from "@/modules/exercise/hooks/mutations";

export const Route = createFileRoute("/dashboard/exercises/add")({
	component: RouteComponent,
	loader: () => ({
		crumb: "New Quiz",
	}),
});

function RouteComponent() {
	const { label } = Route.useRouteContext();
	const form = useNewExerciseForm();

	const { createExercise } = useCreateExercise();

	const navigate = useNavigate();

	const handleSubmit = form.handleSubmit((data) => {
		createExercise(data, {
			onSuccess(data) {
				navigate({
					to: "/dashboard/exercises/$exerciseId/edit/curriculum",
					params: {
						quizId: data.data.id.toString(),
					},
				})
			},
		})
	}, console.log);

	return (
		<div>
			<div className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/exercises" resource={label.plural} />
				<Page.Title title={`Create New ${label.single}`} />
			</div>
			<div className="mx-auto max-h-screen">
				<Suspense fallback={<Loader />}>
					<NewExerciseForm {...{ form, handleSubmit }} />
				</Suspense>
			</div>
		</div>
	)
}

// function RouteComponent() {
// 	return (
// 		<div>
// 			<div className="flex flex-col mb-4 items-start">
// 				<BackButton to="/dashboard/exercises" resource="Quizzes" />
// 				<Page.Title title="Create New Quiz" />
// 			</div>
// 			<div className="mx-auto">
// 				<NewQuizForm />
// 			</div>
// 		</div>
// 	);
// }
