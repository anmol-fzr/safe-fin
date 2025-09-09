import { BackButton } from "@/components/form/button/BackButton";
import { getQuizOpts } from "@/hooks/api/quiz";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/quiz/$quizId")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const quizId = params.quizId;
		const id = parseInt(quizId);

		if (isNaN(id)) {
			throw redirect({ to: "/dashboard/quiz" });
		}

		const quiz = await context.queryClient.ensureQueryData(getQuizOpts(id));
		return {
			crumb: `Quiz: ${quiz.data.title}`,
			quiz,
		};
	},
});

function RouteComponent() {
	const params = Route.useParams();
	const { quiz } = Route.useLoaderData();

	return (
		<>
			<BackButton to="/dashboard/quiz" resource="Quiz" />
			Render Quiz Here
		</>
	);
}
