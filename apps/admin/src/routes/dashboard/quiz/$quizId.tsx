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
	const contentJson = lesson.data.contentJson;
	const content = lesson.data.content ?? "";

	return (
		<>
			<BackButton to="/dashboard/lessons" resource="Lessons" />
			<Editor content={contentJson ?? content} />
		</>
	)
}
