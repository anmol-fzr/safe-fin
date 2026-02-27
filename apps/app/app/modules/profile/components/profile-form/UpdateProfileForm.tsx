import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components";
import { useUpdateUser } from "@/modules/auth/hooks/useUpdateUser";
import { getSessionOpts } from "../../hooks/queries";
import { ProfileForm, useProfileForm } from "./ProfileForm";

const useUpdateProfileForm = () => {
	const queryClient = useQueryClient();

	const form = useProfileForm({
		defaultValues: async () => {
			const session = await queryClient.ensureQueryData(getSessionOpts());

			if (session.error !== null || session.data === null) {
				return {
					name: "",
					bio: "",
					email: "",
					image: "",
				};
			}

			const { name, bio = "", email, image } = session.data.user;

			return {
				name,
				bio,
				email,
				image,
			};
		},
	});

	return form;
};

const useUpdateProfile = () => {
	const form = useUpdateProfileForm();
	const { updateUser, isUpdatingUser } = useUpdateUser();

	const onSubmit = form.handleSubmit((data) => {
		updateUser({
			name: data.name,
			bio: data.bio,
			image: data.image,
		});
	});

	return {
		form,
		onSubmit,
		isUpdatingUser,
	};
};

export function UpdateProfileForm() {
	const { form, onSubmit, isUpdatingUser } = useUpdateProfile();

	return (
		<ProfileForm.Root {...form}>
			<ProfileForm.Fields>
				<ProfileForm.AvatarPicker />
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
