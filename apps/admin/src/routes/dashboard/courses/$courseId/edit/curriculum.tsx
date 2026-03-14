import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";
import { BackButton } from "@/components/form/button/BackButton";
import Loader from "@/components/loader";
import { Page } from "@/components/page";
import { CurriculumBuilder } from "@/modules/courses/components/CurriculumBuilder";

export const Route = createFileRoute(
	"/dashboard/courses/$courseId/edit/curriculum",
)({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const courseId = params.courseId;
		const id = Number(courseId);

		if (!Number.isInteger(id)) {
			throw redirect({ to: "/dashboard/courses" });
		}

		return {
			crumb: `${context.label.single}: Curriculum Builder`,
			lessonId: id,
		};
	},
});

function RouteComponent() {
	const { label } = Route.useRouteContext();
	const { courseId } = Route.useParams();

	return (
		<div>
			<div className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/courses" resource={label.plural} />
				<Page.Title title="Course Curriculum Builder" />
			</div>
			<div className="mx-auto">
				<Suspense fallback={<Loader />}>
					<CurriculumBuilder courseId={Number(courseId)} />
				</Suspense>
			</div>
		</div>
	);
}
