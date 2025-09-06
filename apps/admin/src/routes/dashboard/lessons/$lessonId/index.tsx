import { getLessonOpts } from "@/hooks/api/lesson";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/lessons/$lessonId/")({
	component: Outlet,
	loader: async ({ params, context }) => {
		const lesson = await context.queryClient.fetchQuery(
			getLessonOpts(params.lessonId),
		);
		return {
			crumb: `Lesson: ${lesson.data.title}`,
		};
	},
});
