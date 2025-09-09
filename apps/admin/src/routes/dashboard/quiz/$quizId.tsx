import { BackButton } from "@/components/form/button/BackButton";
import { Page } from "@/components/page";
import { getQuizOpts } from "@/hooks/api/quiz";
import { cn } from "@/lib/utils";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { optional } from "zod";

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

const bgs = {
	option: "bg-accent",
	answer: "bg-green-500",
};
function RouteComponent() {
	const { data: quiz } = Route.useLoaderData().quiz;

	return (
		<Page>
			<Page.Header className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/quiz" resource="Quiz" />
				<Page.Title title={quiz.title} />
			</Page.Header>
			<Page.Content>
				<p>{quiz.desc}</p>

				<div className="space-y-2">
					<div className="flex items-center gap-4">
						<div className={cn("h-12 aspect-square", bgs.option)} />
						Option
					</div>
					<div className="flex items-center gap-4">
						<div className={cn("h-12 aspect-square", bgs.answer)} />
						Answer
					</div>
				</div>

				<div className="p-1 grid grid-cols-2 gap-4">
					{quiz.questions.map((question, index) => (
						<div key={question.id} className="bg-muted p-4 rounded-xs">
							<p className="font-semibold text-lg">
								#{index + 1} {question.question}
							</p>
							<div className="options p-2 space-y-2 mt-4">
								{question.options.map((option) => (
									<div
										key={option.id}
										className={cn(
											" p-2 bg-secondary rounded-xs pl-3",
											question.answerId === option.id ? bgs.answer : bgs.option,
										)}
									>
										{option.value}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</Page.Content>
		</Page>
	);
}
