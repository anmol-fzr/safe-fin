import { Button } from "@/components";
import { useUpdateUser } from "@/modules/auth/hooks/useUpdateUser";
import { authClient } from "@/modules/auth/utils";
import { ProfileForm, useProfileForm } from "./ProfileForm";

const useUpdateProfileForm = () => {
	const form = useProfileForm({
		defaultValues: async () => {
			const session = await authClient.getSession();
			if (session.error !== null) {
				return {
					name: "",
					bio: "",
					email: "",
					image: "",
				};
			}

			return {
				name: session.data?.user?.name ?? "",
				bio: session.data?.user?.bio ?? "",
				email: session.data?.user?.email ?? "",
				image: session.data?.user?.image ?? "",
			};
		},
	});

	return form;
};

export function UpdateProfileForm() {
	const form = useUpdateProfileForm();
	const { updateUser, isUpdatingUser } = useUpdateUser();

	const onSubmit = form.handleSubmit((data) => {
		updateUser({
			name: data.name,
			bio: data.bio,
			image: data.image,
		});
	});

	return (
		<ProfileForm.Root {...form}>
			<ProfileForm.Fields>
				<ProfileForm.Avatar />
				<ProfileForm.Name />
				<ProfileForm.Bio />
				<ProfileForm.Email status="disabled" />
			</ProfileForm.Fields>

			<ProfileForm.Actions>
				<Button
					preset="reversed"
					status={isUpdatingUser ? "loading" : undefined}
					loadingText="Updating ..."
					onPress={onSubmit}
				>
					Update
				</Button>
			</ProfileForm.Actions>
		</ProfileForm.Root>
	);
}
