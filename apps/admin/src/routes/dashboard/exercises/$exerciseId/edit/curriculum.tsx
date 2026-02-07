import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { BackButton } from "@/components/form/button/BackButton";
import Loader from "@/components/loader";
import { Page } from "@/components/page";
import { CurriculumBuilder } from "@/modules/courses/components/CurriculumBuilder";
import { ExerciseBuilder } from "@/modules/exercise/components/exercise-builder";

export const Route = createFileRoute(
	"/dashboard/exercises/$exerciseId/edit/curriculum",
)({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const exerciseId = params.exerciseId;
		const id = Number(exerciseId);

		if (!Number.isInteger(id)) {
			throw redirect({ to: "/dashboard/courses" });
		}

		return {
			crumb: `${context.label.single} Builder`,
			lessonId: id,
		}
	},
});

function RouteComponent() {
	const { label } = Route.useRouteContext();
	const { exerciseId } = Route.useParams();

	return (
		<div>
			<div className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/courses" resource={label.plural} />
				<Page.Title title={`${label.single} Builder`} />
			</div>
			<div className="mx-auto">
				<Suspense fallback={<Loader />}>
					<ExerciseBuilder exerciseId={Number(exerciseId)} />
				</Suspense>
			</div>
		</div>
	)
}
