import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/form/LoginForm";
import { authClient } from "@/lib/auth";
import Loader from "@/components/loader";

export const Route = createFileRoute("/")({
	beforeLoad: async () => {
		const session = await authClient.getSession();
		if (session.data !== null) {
			throw redirect({ to: "/dashboard" });
		}
	},
	component: HomeComponent,
	pendingComponent: Loader,
});

function HomeComponent() {
	return (
		<div className="h-screen grid place-items-center">
			<LoginForm />
		</div>
	);
}
