import { BackButton } from "@/components/form/button/BackButton";
import { UpdateLessonForm } from "@/components/lessons/UpdateLessonForm";
import Loader from "@/components/loader";
import { Page } from "@/components/page";
import { getLessonOpts } from "@/hooks/api/lesson";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/dashboard/lessons/$lessonId/update")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const lessonId = params.lessonId;
		const id = parseInt(lessonId);

		if (isNaN(id)) {
			throw redirect({ to: "/dashboard/lessons" });
		}

		const lesson = await context.queryClient.ensureQueryData(getLessonOpts(id));
		return {
			crumb: `Lesson: ${lesson.data.title}`,
		};
	},
});

function RouteComponent() {
	const params = Route.useParams();
	const lessonId = parseInt(params.lessonId);

	return (
		<div>
			<div className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/lessons" resource="Lessons" />
				<Page.Title title="Update Lesson" />
			</div>
			<div className="mx-auto">
				<Suspense fallback={<Loader />}>
					<UpdateLessonForm lessonId={lessonId} />
				</Suspense>
			</div>
		</div>
	);
}
