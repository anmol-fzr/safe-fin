import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/form/LoginForm";
import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/")({
	beforeLoad: async ({ navigate }) => {
		const data = await authClient.getSession();
		if (data.session) {
			navigate("/dashboard");
		}
	},
	component: HomeComponent,
});

function HomeComponent() {
	return (
		<div className="h-screen grid place-items-center">
			<LoginForm />
		</div>
	);
}
