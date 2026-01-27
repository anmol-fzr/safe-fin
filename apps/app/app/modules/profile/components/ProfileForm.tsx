import { FormProvider } from "react-hook-form";
import { Button } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useYupForm } from "@/hooks";
import { useUpdateUser } from "@/modules/auth/hooks/useUpdateUser";
import { profileSchema } from "@/modules/auth/schema";
import { getFakeEmail } from "@/utils/faker/fields";
import { useAuthStore } from "@/modules/auth/store";

export const ProfileForm = () => {
	const user = useAuthStore((state) => state.user);

	const methods = useYupForm({
		schema: profileSchema,
		defaultValues: async () => {
			return {
				name: user?.name ?? "",
				email: user?.email ?? "",
			};
		},
	});

	const { updateUser, isUpdatingUser } = useUpdateUser();

	const onSubmit = methods.handleSubmit((data) => {
		updateUser({
			name: data.name,
		});
	});

	return (
		<FormProvider {...methods}>
			<FormField name="name" label="Name" placeholder="John Doe" />
			<FormField
				name="email"
				label="Email Address"
				placeholder={getFakeEmail()}
				status="disabled"
			/>
			<Button
				preset="reversed"
				status={isUpdatingUser ? "loading" : undefined}
				onPress={onSubmit}
			>
				Update
			</Button>
		</FormProvider>
	);
};
