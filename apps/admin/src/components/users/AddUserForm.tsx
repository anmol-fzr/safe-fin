import { useYupForm } from "@/hooks/form/useYupForm";
import { Form } from "../ui/form";
import { FormInput } from "../form/form-input";
import { faker } from "@faker-js/faker";
import { FormSelect } from "../form/form-select";
import { Button } from "../ui/button";
import { addUserSchema } from "@/schema/user.schema";
import { useCreateUser } from "@/hooks/api/user";

export function getAddUserFormPlaceholders() {
	const firstName = faker.person.firstName();
	const lastName = faker.person.lastName();

	return {
		name: `${firstName} ${lastName}`,
		email: faker.internet.exampleEmail({
			firstName,
			lastName,
			allowSpecialCharacters: false,
		}),
		phoneNumber: faker.helpers.fromRegExp("[6-9]{3}[0-9]{2}-[0-9]{5}"),
		password: faker.internet.password(),
	};
}

type AddUserFormProps = {
	onClose: VoidFunction;
};

export function AddUserForm({ onClose }: AddUserFormProps) {
	const form = useYupForm({
		schema: addUserSchema,
	});

	const { createUser } = useCreateUser();
	const onSubmit = form.handleSubmit((values) => {
		createUser(values);
		onClose();
	});

	const placeholders = getAddUserFormPlaceholders();

	return (
		<Form {...form} onSubmit={onSubmit} className="flex flex-col flex-1">
			<div className="flex flex-col gap-4 !h-full flex-1">
				<FormInput name="name" placeholder={placeholders.name} label="Name" />
				<FormInput
					name="email"
					placeholder={placeholders.email}
					label="Email"
				/>
				<FormInput
					name="phoneNumber"
					placeholder={placeholders.phoneNumber}
					label="Phone Number"
				/>
				<FormInput
					name="password"
					placeholder={placeholders.password}
					label="Password"
				/>
				<FormSelect
					className="w-full"
					name="role"
					label="Role"
					placeholder="Select a Role"
					options={[
						{ label: "Admin", value: "admin" },
						{ label: "User", value: "user" },
					]}
				/>
			</div>
			<Button type="submit">Submit</Button>
		</Form>
	);
}
