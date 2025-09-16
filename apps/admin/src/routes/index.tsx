import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/auth/form/LoginForm";
import Loader from "@/components/loader";
import { useAuthStore } from "@/store/useAuthStore";

export const Route = createFileRoute("/")({
	beforeLoad: async () => {
		const isLogin = useAuthStore.getState().isLogin;

		if (isLogin) {
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
