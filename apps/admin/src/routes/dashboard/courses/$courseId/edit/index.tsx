import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit } from "iconsax-reactjs";
import { lazy, Suspense } from "react";
import { BackButton } from "@/components/form/button/BackButton";
import Loader from "@/components/loader";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { getCourseOpts } from "@/modules/courses/hooks/queries";

const UpdateCourseForm = lazy(
	() => import("@/modules/courses/components/course-form/UpdateCourseForm"),
);

export const Route = createFileRoute("/dashboard/courses/$courseId/edit/")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const courseId = Number(params.courseId);

		const { data, ...rest } = await context.queryClient.ensureQueryData(
			getCourseOpts(courseId),
		);

		const title = `Edit ${context.label.single}: ${data.content.title}`;
		return {
			crumb: title,
			title,
			course: data,
			...rest,
		};
	},
});

function RouteComponent() {
	const { courseId } = Route.useParams();
	const { label } = Route.useRouteContext();
	const { title, course } = Route.useLoaderData();

	return (
		<Page>
			<Page.Header className="flex flex-col mb-4 items-start">
				<BackButton to="/dashboard/courses" resource={`All ${label.plural}`} />
				<Page.Title title={title} />
			</Page.Header>
			<Page.Content>
				<Button className="w-fit" variant="secondary" asChild>
					<Link
						to="/dashboard/courses/$courseId/edit/curriculum"
						params={{ courseId }}
					>
						<Edit />
						Edit Curriculum
					</Link>
				</Button>

				<Suspense fallback={<Loader />}>
					<UpdateCourseForm
						course={{
							id: course.id,
							title: course.content.title,
							shortDesc: course.content.shortDesc,
							longDescJson: course.content.longDesc.contentJson,
							coverUrl: course.coverUrl,
							isPublished: course.isPublished,
						}}
					/>
				</Suspense>
			</Page.Content>
		</Page>
	);
}
