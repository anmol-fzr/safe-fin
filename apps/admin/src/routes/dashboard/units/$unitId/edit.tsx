import { yupResolver } from "@hookform/resolvers/yup";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { convertJsonToMarkdown } from "@/components/editor/Editor";
import { FormEditor } from "@/components/form/form-editor";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UnitForm } from "@/modules/courses/components/unit-form/UnitForm";
import { useUpdateUnit } from "@/modules/courses/hooks/mutations";
import { getUnitOpts } from "@/modules/courses/hooks/queries";
import { newUnitSchema } from "@/modules/courses/schema/unit.schema";

export const Route = createFileRoute("/dashboard/units/$unitId/edit")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const unitId = params.unitId;
		const id = Number(unitId);

		if (!Number.isInteger(id)) {
			throw redirect({ to: "/dashboard/courses" });
		}

		const { data, ...rest } = await context.queryClient.ensureQueryData(
			getUnitOpts(id),
		);

		return {
			crumb: `Edit Unit: ${data.content.title}`,
			unit: data,
			...rest,
		};
	},
});

function RouteComponent() {
	const { unitId } = Route.useParams();
	const { unit } = Route.useLoaderData();

	const form = useForm({
		resolver: yupResolver(newUnitSchema),
		defaultValues: {
			title: unit.content.title,
			shortDesc: unit.content.shortDesc,
			content: unit.content.longDesc.contentJson,
			points: unit.points,
		},
	});

	const { updateUnitAsync } = useUpdateUnit();

	const handleSubmit = form.handleSubmit((data) => {
		updateUnitAsync({
			unitId: parseInt(unitId),
			data: {
				...data,
				content: convertJsonToMarkdown(data.content),
				contentJson: data.content,
			},
		}).then((resp) => {
			console.log(resp);
		});
	});

	return (
		<Page>
			<Page.Header>
				<Page.Title title="Edit Unit" />
			</Page.Header>
			<Page.Content>
				<div className="flex mx-auto">
					<UnitForm.Root form={form} handleSubmit={handleSubmit}>
						<div className="w-full max-w-2xl space-y-4">
							<UnitForm.TitleField />
							<UnitForm.DescField />
							<UnitForm.PointsField />
							<UnitForm.Editor />
							<UnitForm.Actions>
								<UnitForm.CancelAction />
								<UnitForm.SaveAction />
							</UnitForm.Actions>
						</div>
					</UnitForm.Root>
				</div>
			</Page.Content>
		</Page>
	);
}
