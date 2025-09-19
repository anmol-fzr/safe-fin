import { createFileRoute, redirect } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { BackButton } from "@/components/form/button/BackButton";
import Loader from "@/components/loader";
import { Page } from "@/components/page";
import { getLessonOpts } from "@/hooks/api/lesson";

const ViewLessonForm = lazy(
	() => import("@/components/lessons/ViewLessonForm"),
);

export const Route = createFileRoute("/dashboard/lessons/$lessonId/view")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const lessonId = params.lessonId;
		const id = Number(lessonId);

		if (!Number.isInteger(id)) {
			throw redirect({ to: "/dashboard/lessons" });
		}

		const lesson = await context.queryClient.ensureQueryData(getLessonOpts(id));
		return {
			crumb: `Lesson: ${lesson.data.title}`,
			lessonId: id,
		};
	},
});

function RouteComponent() {
	const { lessonId } = Route.useLoaderData();

	return (
		<div>
			<div className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/lessons" resource="Lessons" />
				<Page.Title title="View Lesson" />
			</div>
			<div className="grid place-items-center">
				<Suspense fallback={<Loader />}>
					<ViewLessonForm lessonId={lessonId} disabled />
				</Suspense>
			</div>
		</div>
	);
}
