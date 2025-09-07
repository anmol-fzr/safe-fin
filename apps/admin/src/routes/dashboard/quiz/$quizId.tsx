import { Editor } from "@/components/editor/Editor";
import { BackButton } from "@/components/form/button/BackButton";
import { getLessonOpts, useGetLesson } from "@/hooks/api/lesson";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/quiz/$quizId")({
	component: RouteComponent,
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(getLessonOpts(params.lessonId)),
});

function RouteComponent() {
	const params = Route.useParams();
	const { lesson } = useGetLesson(params.lessonId);

	return (
		<>
			<BackButton to="/dashboard/quiz" resource="Quiz" />
			Render Quiz Here
		</>
	);
}
